const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema(
  {
    groupMemberId: mongoose.ObjectId,
    eventId: mongoose.ObjectId,
    attending: String, // going, not going, unconfirmed
    weightedPreferences: {
      likes: [],
      dislikes: [],
    },
    distanceLevel: Number,
    priceLevel: Number,
    carpoolStatus: String, // driver, rider, none
    availability: [Date],
  },
  { collection: "Response", timestamps: true }
);

module.exports = ResponseSchema;

// 3:15
