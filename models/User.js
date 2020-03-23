const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile_pictures: {
    type: Array,
    default: [],
    required: true
  }
});

let User = (module.exports = mongoose.model("User", userSchema));
