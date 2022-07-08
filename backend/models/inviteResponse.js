const mongoose = require("mongoose");

const InviteResponseSchema = new mongoose.Schema({
  attending: Boolean,
  priceLevel: Number,
  distanceLevel: Number,
  weightedLikes: [String],
  weightedDislikes: [String],
  //   carpoolStatus: String,
  //   timeSlots: [String]
});

const InviteResponse = mongoose.model("InviteResponse", InviteResponseSchema);

module.exports = InviteResponse;
