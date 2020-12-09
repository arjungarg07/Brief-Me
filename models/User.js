const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  email: String,
  creationDate: { type: Date },
  lastLogin: { type: Date },
  googleId: { type: String, unique: true },
});

module.exports = mongoose.model("User", userSchema);
