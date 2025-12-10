const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 4,
    maxlength: 15,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  firstName: {
    type: String,
    maxlength: 50,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    maxlength: 50,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
