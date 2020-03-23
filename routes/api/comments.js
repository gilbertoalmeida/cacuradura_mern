const express = require("express");
const router = express.Router();
/* 
This is the middleware to protect routes. Add as a second parameter to
the route that will need a token to be accessible. And you have to send the tokenConfig together with the axios request */
const auth = require("../../middleware/auth");

//Bringing Comment Model
const Comment = require("../../models/Comment");

// @route   POST api/comments/add
// @desc    Post a comment to an article in the database
// @access  Private
router.post("/add", auth, (req, res) => {
  const {
    articleID,
    author: { username, _id },
    comment
  } = req.body;

  //Simple validation
  if (!comment) {
    return res.status(400).json({
      msg: "missing_comment" //this is now not the error message itself, but part of the id of the translation
    });
  }

  const newComment = new Comment({
    articleID,
    author: {
      username: username,
      _id: _id
    },
    comment_text: comment
  });

  newComment.save();

  res.json({
    newComment
  });
});

module.exports = router;
