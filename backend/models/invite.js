const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
  hostId: mongoose.ObjectId,
  rsvpDeadline: Date,
  members: [mongoose.ObjectId],
  responses: [mongoose.ObjectId],
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
