const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: String,
  members: [mongoose.ObjectId],
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
