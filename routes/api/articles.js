const express = require("express");
const router = express.Router();

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
