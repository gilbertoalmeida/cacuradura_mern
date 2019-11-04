const express = require("express");
const router = express.Router();
/* 
This is the middleware to protect routes. Add as a second parameter to
the route that will need a token to be accessible
const auth = require("../../middleware/auth"); */

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

module.exports = router;
