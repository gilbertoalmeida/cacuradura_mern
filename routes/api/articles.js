const express = require("express");
const router = express.Router();
/* 
This is the middleware to protect routes. Add as a second parameter to
the route that will need a token to be accessible */
const auth = require("../../middleware/auth");

//Bringing Article Model
const Article = require("../../models/Article");

// @route   GET api/articles
// @desc    Get All articles
// @access  Public
router.get("/", (req, res) => {
  Article.find()
    .sort({ date: -1 })
    .then(articles => res.json(articles));
});

// @route   GET api/articles/:id
// @desc    Get one article by its id
// @access  Public
router.get("/:id", (req, res) => {
  Article.findById(req.params.id).then(article => res.json(article));
});

<<<<<<< HEAD
// @route   POST api/articles/add
// @desc    Post an article to the database
// @access  Private
router.post("/add", auth, (req, res) => {
  const { title, body } = req.body;

  //Simple validation
  if (!title || !body) {
    return res.status(400).json({
      msg: "O artigo precisa de um título e um texto, frô"
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
=======
router.get("/user/:id", (req, res) => {
  let query = { "author._id": req.params.id };
  Article.find(query)
    .sort({ date: -1 })
    .then(articles => res.json(articles));
>>>>>>> c0d85951ad6b52c3105eea4ad6448390bbefae3e
});

module.exports = router;
