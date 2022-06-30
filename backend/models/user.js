const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// add profile pic

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    dietaryProfile: {
      likes: [String],
      dislikes: [String],
      restrictions: [String],
    },
    events: [mongoose.ObjectId],
    groups: [mongoose.ObjectId],
  },
  { collection: "Users", timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = UserSchema;
