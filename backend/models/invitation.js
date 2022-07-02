const mongoose = require("mongoose");

const InvitationSchema = new mongoose.Schema(
  {
    host: mongoose.ObjectId,
    description: String,
    location: String,
    day: Date,
    rsvpDeadline: Date,
    filtersEnabled: {
      carpool: Boolean,
      distanceLevel: Boolean,
      priceLevel: Boolean,
    },
    timeSlots: [Date],
    invitees: {
      going: [mongoose.ObjectId],
      notGoing: [mongoose.ObjectId],
      unconfirmed: [mongoose.ObjectId],
      needARide: [mongoose.ObjectId],
    },
    responses: [mongoose.ObjectId],
  },
  { collection: "Events", timestamps: true }
);

module.exports = InvitationSchema;

//
