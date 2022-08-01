const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  username: {
    unique: true,
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Email is invalid"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    select: false,
  },
  dietaryProfile: {
    likes: [String],
    dislikes: [String],
    restrictions: [String],
    favoriteRestaurants: [Object],
  },
  events: [mongoose.ObjectId],
  groups: [mongoose.ObjectId],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
