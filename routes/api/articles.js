const express = require("express");
const router = express.Router();
/* 
This is the middleware to protect routes. Add as a second parameter to
the route that will need a token to be accessible. And you have to send the tokenConfig together with the axios request */
const auth = require("../../middleware/auth");

//Bringing Article Model
const Article = require("../../models/Article");

// @route   GET api/articles
// @desc    Get All articles
// @access  Public
router.get("/", (req, res) => {
  Article.find({ homepage: true })
    .sort({ date: -1 })
    .then(articles => res.json(articles));
});

// @route   GET api/articles/:id
// @desc    Get one article by its id
// @access  Public
router.get("/:id", (req, res) => {
  Article.findById(req.params.id).then(article => res.json(article));
});

// @route   GET api/articles/user/:id
// @desc    Get all articles from one user by its id
// @access  Public
router.get("/user/:id", (req, res) => {
  let query = { "author._id": req.params.id };
  Article.find(query)
    .sort({ date: -1 })
    .then(articles => res.json(articles));
});

// @route   POST api/articles/add
// @desc    Post an article to the database
// @access  Private
router.post("/add", auth, (req, res) => {
  const { title, body } = req.body;

  console.log("body: " + body);

  //Simple validation
  if (!title || body == "<p><br></p>") {
    return res.status(400).json({
      msg: "missing_title_text" //this is now not the error message itself, but part of the id of the translation
    });
  }

  const newArticle = new Article({
    title,
    body,
    author: {
      username: req.body.author.username,
      _id: req.body.author._id
    }
  });

  newArticle.save();

  res.json({
    newArticle
  });
});

module.exports = router;
