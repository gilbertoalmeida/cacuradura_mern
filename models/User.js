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

//some fields to add in the future: likes, tags, comments.
//a last edited, that will be by default null, but updated to the date.now everytime the user
//updates. Aí no component dos artigos eu vou mostrar só a data, mas se o last edited nao for null
//mostra tb o last edited

let User = (module.exports = mongoose.model("User", userSchema));
