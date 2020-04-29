const express = require("express");
const router = express.Router();
/* 
This is the middleware to protect routes. Add as a second parameter to
the route that will need a token to be accessible. And you have to send the tokenConfig together with the axios request */
const auth = require("../../middleware/auth");

//Bringing Article Model
const Article = require("../../models/Article");

// @route   GET api/articles/pt
// @desc    Get All portuguese articles that are marked as homepage
// @access  Public
router.get("/pt", (req, res) => {
  Article.aggregate([
    { $match: { homepage: true, language: "pt" } },
    { $project: { body: 0 } },
    { $sample: { size: 8 } }
  ]).then(articles => res.json(articles));
});

// @route   GET api/articles/pt
// @desc    Get All international articles that are marked as homepage
// @access  Public
router.get("/en", (req, res) => {
  Article.aggregate([
    { $match: { homepage: true, language: "en" } },
    { $project: { body: 0 } },
    { $sample: { size: 8 } }
  ]).then(articles => res.json(articles));
});

// @route   GET api/articles/:id
// @desc    Get one article by its id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404);
    }

    res.json(article);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   GET api/articles/user/:id
// @desc    Get all articles from one user by its id
// @access  Public
router.get("/user/:username", async (req, res) => {
  let query = { "author.username": req.params.username };
  try {
    const articles = await Article.find(query, { body: 0 });

    if (!articles) {
      return res.status(404);
    }

    res.json(articles);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   POST api/articles/add
// @desc    Post an article to the database
// @access  Private
router.post("/add", auth, (req, res) => {
  const { title, body, coverImg, language } = req.body;

  //Simple validation
  if (!title || body == "<p><br></p>") {
    return res.status(400).json({
      msg: "missing_title_text" //this is now not the error message itself, but part of the id of the translation
    });
  }

  const newArticle = new Article({
    title,
    body,
    coverImg,
    language,
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

// @route   PATCH api/articles/edit/:id
// @desc    Edit an article of the database
// @access  Private
router.patch("/edit/:id", auth, async (req, res) => {
  const { title, body, coverImg } = req.body;

  //Simple validation
  if (!title || body == "<p><br></p>") {
    return res.status(400).json({
      msg: "missing_title_text" //this is now not the error message itself, but part of the id of the translation
    });
  }

  try {
    const articleUser = await Article.findById(req.params.id, {
      author: 1,
      _id: 0
    });

    // Check if token sent by the user has id of the article's author
    if (articleUser.author._id !== req.user._id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    //Article Object
    const articleFields = {
      title,
      body,
      coverImg,
      editDate: Date.now()
    };

    let foundAndEditedArticle = await Article.findOneAndUpdate(
      { _id: req.params.id },
      articleFields,
      { new: true, useFindAndModify: false }
    );
    res.json(foundAndEditedArticle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
