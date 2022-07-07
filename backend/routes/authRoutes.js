const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const User = require("../models/user");
const Group = require("../models/group");

// ---- Authentication ----

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

// ---- All users ----

router.get("/allUsers", authController.checkUser, async (req, res) => {
  // let options = { ...req.query };
  try {
    const allUsers = await User.find({ _id: { $ne: req.user._id } });
    res.status(201).json(allUsers);
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

router.get("/user/:id", async (req, res) => {
  // let userId = req.params.id;
  try {
    const user = await User.findById(req.params.id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.get("/user/info", async (req, res) => {
  let userId = req.body.id;
  try {
    const user = await User.findById(userId);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

// create group
router.patch("/group/create", authController.checkUser, async (req, res) => {
  try {
    const newGroup = await Group.create({
      name: req.body.name,
      members: req.body.members,
    });

    req.user.groups.push(newGroup);
    req.user.save();

    res.status(201).json({ user: req.user });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

// add members to group
// remove members from group

// exports.signup = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   const pw = await encryptPw(password);
//   try {
//     const newUser = await User.create({
//       firstName,
//       lastName,
//       email,
//       password: pw,
//     });
//     sendToken(newUser, 201, req, res);
//   } catch (err) {
//     res.status(401).json(err.message);
//   }
// };

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
    req.user.dietaryProfile[sectionType] = req.body.updatedArray;

    req.user.save();

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
