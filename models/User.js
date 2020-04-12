const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile_pictures: {
    type: Array,
    default: [],
    required: false
  }
});

let User = (module.exports = mongoose.model("User", userSchema));
