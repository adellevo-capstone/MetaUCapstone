const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const User = require("../models/user");
const Group = require("../models/group");
const Invite = require("../models/invite");
const InviteResponse = require("../models/inviteResponse");
const axios = require("axios");

// ---- Authentication ----

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

// ---- Yelp API ----

router.post("/restaurantInfo", authController.checkUser, async (req, res) => {
  try {
    const { location, searchQuery } = req.body;
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/search?term=${searchQuery}&location=${location}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
      }
    );
    const restaurantData = response.data.businesses[0];
    res.status(201).json(restaurantData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ---- All users ----

router.get("/allUsers", authController.checkUser, async (req, res) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.user._id } });
    res.status(201).json(allUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ---- Events ----

// get events
router.get("/events", authController.checkUser, async (req, res) => {
  try {
    const eventIds = req.user.events;
    let eventsHosted = [];
    let eventsInvitedTo = [];

    for (let i = 0; i < eventIds.length; i++) {
      const eventInfo = await Invite.findById(eventIds[i]);
      if (eventInfo.hostId.equals(req.user._id)) {
        eventsHosted.push(eventInfo);
      } else {
        eventsInvitedTo.push(eventInfo);
      }
    }

    res.status(201).json({ hosted: eventsHosted, invitedTo: eventsInvitedTo });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

// add group or event ids to corresponding user's profiles
const updateMemberProfiles = async (arrayType, createdItemId, memberIds) => {
  for (let i = 0; i < memberIds.length; i++) {
    let member = await User.findById(memberIds[i]);
    member[arrayType].unshift(createdItemId);
    member.save();
  }
};

// create event
router.patch("/event/create", authController.checkUser, async (req, res) => {
  try {
    const { dateMap, startTime } = req.body.timeSlots;

    const hostResponse = await InviteResponse.create({
      groupId: req.body.groupId,
      guestId: req.user._id,
      attending: true,
      priceLevel: parseInt(req.body.priceLevel),
      distanceLevel: parseInt(req.body.distanceLevel),
      weightedLikes: req.body.weightedLikes,
      availability: dateMap,
    });

    const newEvent = await Invite.create({
      groupId: req.body.groupId,
      hostId: req.user._id,
      title: req.body.title,
      rsvpDeadline: new Date(req.body.rsvpDeadline),
      members: req.body.members,
      attendance: {
        going: [hostResponse._id],
        notGoing: [],
      },
      timeSlots: { dateMap: dateMap, startTime: startTime },
      eventDetails: {
        description: req.body.description,
      },
    });

    let unconfirmed = [];
    const guests = newEvent.members.filter((memberId) => !memberId.equals(newEvent.hostId));

    for (let i = 0; i < guests.length; i++) {
      const defaultGuestResponse = await InviteResponse.create({
        groupId: req.body.groupId,
        guestId: guests[i],
      });
      unconfirmed.push(defaultGuestResponse._id);
    }

    newEvent.attendance.unconfirmed = [...unconfirmed];
    newEvent.save();

    await updateMemberProfiles("events", newEvent._id, newEvent.members);

    res.status(201).json({ createdEvent: newEvent });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

// ---- InviteResponse ----

const getInviteResponseDetails = async (attendanceArray) => {
  let details = [];
  for (let i = 0; i < attendanceArray.length; i++) {
    const inviteResponse = await InviteResponse.findById(attendanceArray[i]);
    const { guestId, attending, priceLevel, distanceLevel, weightedLikes, availability } =
      inviteResponse;
    const guest = await User.findById(guestId);
    details.push({
      name: `${guest.firstName} ${guest.lastName}`,
      attending,
      priceLevel,
      distanceLevel,
      weightedLikes,
      availability,
    });
  }
  return details;
};

router.get("/inviteResponses/:eventId", authController.checkUser, async (req, res) => {
  try {
    const event = await Invite.findOne({ eventId: req.params.eventId });
    const going = await getInviteResponseDetails(event.attendance.going);
    const notGoing = await getInviteResponseDetails(event.attendance.notGoing);
    const unconfirmed = await getInviteResponseDetails(event.attendance.unconfirmed);

    res.status(201).json({ going: going, notGoing: notGoing, unconfirmed: unconfirmed });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.patch("/inviteResponse/update", authController.checkUser, async (req, res) => {
  try {
    // modify existing invite response
    const filters = {
      groupId: req.body.groupId,
      guestId: req.user._id,
    };
    let update = req.body;
    update.guestId = req.user._id;
    let inviteResponse = await InviteResponse.findOneAndUpdate(filters, update, { new: true });

    // update attendance arrays
    let eventToUpdate = await Invite.findById(req.body.eventId);
    const { going, notGoing, unconfirmed } = eventToUpdate.attendance;
    const index = unconfirmed.find((inviteResponseId) =>
      inviteResponseId.equals(inviteResponse._id)
    );
    unconfirmed.splice(index, 1);
    req.body.attending ? going.push(inviteResponse._id) : notGoing.push(inviteResponse._id);
    eventToUpdate.save();

    res.status(201).json({ inviteResponse: inviteResponse, eventToUpdate: eventToUpdate });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

// ---- Groups ----

// get all groups
router.get("/group", authController.checkUser, async (req, res) => {
  try {
    const groupIds = req.user.groups;
    let groupData = [];
    let memberInfo = [];

    for (let i = 0; i < groupIds.length; i++) {
      const groupInfo = await Group.findById(groupIds[i]);

      for (let i = 0; i < groupInfo.members.length; i++) {
        const member = await User.findById(groupInfo.members[i]);
        memberInfo.push(member);
      }

      const groupToAdd = {
        memberInfo: memberInfo,
        groupInfo: groupInfo,
      };

      groupData.push(groupToAdd);
      memberInfo = [];
    }
    res.status(201).json({ groups: groupData });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.get("/group/:id", authController.checkUser, async (req, res) => {
  try {
    const groupInfo = await Group.findById(req.params.id);
    let memberInfo = [];

    for (let i = 0; i < groupInfo.members.length; i++) {
      const member = await User.findById(groupInfo.members[i]);
      memberInfo.push(member);
    }

    res.status(201).json({ groupName: groupInfo.name, groupId: groupInfo._id, groups: memberInfo });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

// create group
router.patch("/group/create", authController.checkUser, async (req, res) => {
  try {
    const allMembers = [req.user._id, ...req.body.members];
    const newGroup = await Group.create({
      name: req.body.name,
      members: allMembers,
    });
    await updateMemberProfiles("groups", newGroup._id, allMembers);

    res.status(201).json({ createdGroup: newGroup });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

// add members to group
router.patch("/group/:id/addMembers", authController.checkUser, async (req, res) => {
  try {
    // add user ids to group
    const membersToAdd = req.body.members;
    const group = await Group.findById(req.params.id);
    group.members = group.members.concat(membersToAdd);
    group.save();

    await updateMemberProfiles("groups", req.params.id, membersToAdd);

    res.status(201).json({ group: group });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

// remove members from group
router.patch("/group/:id/leave", authController.checkUser, async (req, res) => {
  try {
    // remove group from user's profile
    req.user.groups = req.user.groups.filter((groupId) => !groupId.equals(req.params.id));
    req.user.save();

    // remove user from group
    const group = await Group.findById(req.params.id);
    group.members = group.members.filter((member) => !member.equals(req.user._id));
    group.save();

    res.status(201).json({ userGroups: req.user.groups, group: group });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

// ---- User information ----

router.get("/user", authController.checkUser, async (req, res) => {
  try {
    res.status(201).json({ user: req.user });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.get("/dietaryProfile", authController.checkUser, async (req, res) => {
  try {
    res.status(201).json({ dietaryProfile: req.user.dietaryProfile });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.patch("/dietaryProfile/modify", authController.checkUser, async (req, res) => {
  try {
    const sectionType = req.body.sectionType.toLowerCase();

    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { ["dietaryProfile." + sectionType]: { $each: req.body.updatedArray } } },
      { returnNewDocument: true }
    );

    res.status(201).json({ user: req.user });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.patch("/dietaryProfile/addRestaurant", authController.checkUser, async (req, res) => {
  try {
    const newRestaurant = req.body.restaurantToAdd;

    req.user.dietaryProfile.favoriteRestaurants.unshift(newRestaurant);
    req.user.save();

    res.status(201).json({ user: req.user });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.use(authController.secure);
// router.use(authController.clearanceLevel("level 1"));
// router.route("/secretcontent").get(authController.secretContent);

module.exports = router;
