const express = require("express");
const router = express.Router();
/* 
This is the middleware to protect routes. Add as a second parameter to
the route that will need a token to be accessible. And you have to send the tokenConfig together with the axios request */
const auth = require("../../middleware/auth");

//Bringing Comment Model
const Comment = require("../../models/Comment");

//Bringing User Model
const User = require("../../models/User");

// @route   POST api/comments/add
// @desc    Post a comment to an article in the database
// @access  Private
router.post("/add", auth, (req, res) => {
  const {
    articleID,
    author: { username, _id, picture },
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
      username,
      _id,
      picture
    },
    comment_text: comment
  });

  newComment.save();

  res.json({
    newComment
  });
});

// @route   POST api/comments/add-reply
// @desc    Post a reply to a comment in an article
// @access  Private
router.post("/add-reply", auth, async (req, res) => {
  const {
    commentID,
    author: { username, _id, picture },
    reply
  } = req.body;

  //Simple validation
  if (!reply) {
    return res.status(400).json({
      msg: "missing_comment" //this is now not the error message itself, but part of the id of the translation
    });
  }

  const newReply = {
    $push: {
      replies: {
        author: {
          username,
          _id,
          picture
        },
        reply_text: reply,
        posted: new Date()
      }
    }
  };

  try {
    let foundAndUpdatedComment = await Comment.update(
      { _id: commentID },
      newReply
    );
    res.json({
      foundAndUpdatedComment
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/comments/:id
// @desc    Get all comments from an article by its id, and then get the picture of the user that left each comment
// @access  Public

router.get("/:id", async (req, res) => {
  let commentsWithPicture = [];
  let query = { articleID: req.params.id };
  try {
    let comments = await Comment.find(query);

    for (let i = 0; i < comments.length; i++) {
      try {
        let loadedCommentPicture = await User.findById(comments[i].author._id, {
          profile_pictures: 1
        });
        let commentWithPicture = {
          author: {
            username: comments[i].author.username,
            _id: comments[i].author._id,
            picture: loadedCommentPicture.profile_pictures[0]
          },
          replies: comments[i].replies,
          _id: comments[i]._id,
          articleID: comments[i].articleID,
          comment_text: comments[i].comment_text,
          posted: comments[i].posted
        };
        commentsWithPicture.push(commentWithPicture);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
    res.json(commentsWithPicture);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
