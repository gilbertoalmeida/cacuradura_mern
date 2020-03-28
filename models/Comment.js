const mongoose = require("mongoose");

let commentSchema = mongoose.Schema({
  articleID: {
    type: String,
    required: true
  },
  posted: {
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
    },
    picture: {
      type: String
    }
  },
  comment_text: {
    type: String,
    required: true
  },
  replies: {
    type: Array,
    default: [],
    required: true
  }
});

let Comment = (module.exports = mongoose.model("Comment", commentSchema));
