const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
  hostId: mongoose.ObjectId,
  members: [mongoose.ObjectId],
  // rsvpDeadline: Date,
  responses: [mongoose.ObjectId],
  eventDetails: {
    // time: Date,
    // location: String,
    description: String,
    // carpool: {
    //   drivers:
    // }
  },
});

const Invite = mongoose.model("Invite", InviteSchema);

module.exports = Invite;
