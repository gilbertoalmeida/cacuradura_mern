const mongoose = require("mongoose");

let articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    username: {
      type: String,
      required: true
    },
    _id: {
      type: String,
      required: true
    }
  },
  body: {
    type: String,
    required: true
  },
  homepage: {
    type: Boolean,
    default: false
  }
});

//some fields to add in the future: likes, tags, comments.
//a last edited, that will be by default null, but updated to the date.now everytime the user
//updates. Aí no component dos artigos eu vou mostrar só a data, mas se o last edited nao for null
//mostra tb o last edited

let Article = (module.exports = mongoose.model("Article", articleSchema));
