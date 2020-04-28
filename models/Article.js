const mongoose = require("mongoose");

let articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  editDate: {
    type: Date,
    required: false
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
  coverImg: {
    type: String,
    required: false
  },
  language: {
    type: String,
    required: true
  },
  body: {
    type: Object,
    required: true
  },
  homepage: {
    type: Boolean,
    default: false
  }
});

let Article = (module.exports = mongoose.model("Article", articleSchema));
