const mongoose = require("mongoose");

const InviteResponseSchema = new mongoose.Schema({
  eventId: mongoose.ObjectId,
  groupId: mongoose.ObjectId,
  guestId: mongoose.ObjectId,
  attending: Boolean,
  priceLevel: Number,
  distanceLevel: Number,
  availability: Object,
  carpoolStatus: String,
});

const InviteResponse = mongoose.model("InviteResponse", InviteResponseSchema);

module.exports = InviteResponse;
