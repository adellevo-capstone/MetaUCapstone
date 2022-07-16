const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
  groupId: mongoose.ObjectId,
  hostId: mongoose.ObjectId,
  title: String,
  rsvpDeadline: Date,
  members: [mongoose.ObjectId], // user ids
  attendance: {
    // inviteResponse ids
    going: [mongoose.ObjectId],
    notGoing: [mongoose.ObjectId],
    unconfirmed: [mongoose.ObjectId],
  },
  // responses: [mongoose.ObjectId],
  // unconfirmed: [mongoose.ObjectId],
  timeSlots: {
    dateMap: Object,
    startTime: String,
  },
  eventDetails: {
    time: Date,
    location: String,
    description: String,
    // carpool: {
    //   drivers:
    // }
  },
});

const Invite = mongoose.model("Invite", InviteSchema);

module.exports = Invite;
