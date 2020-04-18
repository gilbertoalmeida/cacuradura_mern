const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth"); //middleware to protect routes

//Bringing User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register new user
// @access  Public

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      msg: "missing_register_fields" //this is now not the error message itself, but part of the id of the translation
    });
  }

  //removing white spaces around the string without notifying the user
  //This is to avoid giving an error msg for a mistake space in the end
  usernameTrim = username.trim().toLowerCase();

  //removing all white spaces in the string and showing an error message if there's any
  let usernameWithoutSpaces = usernameTrim.replace(/\s+/g, "");

  //actually this error message should be of all unwanted characters together.
  if (usernameWithoutSpaces != usernameTrim) {
    return res.status(400).json({
      msg: "whitespaces_username"
    });
  }

  if (usernameWithoutSpaces.length < 4) {
    return res.status(400).json({
      msg: "small_username"
    });
  } else if (usernameWithoutSpaces.length > 30) {
    return res.status(400).json({
      msg: "big_username"
    });
  }

  try {
    //checking if username exists
    let existingUser = await User.findOne({ username: usernameTrim });
    if (existingUser) {
      return res.status(400).json({ msg: "existing_username" });
    }

    const newUser = new User({
      username: usernameTrim,
      password
    });

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt);

    let createdUser = await newUser.save();

    jwt.sign(
      { _id: createdUser._id }, // payload. I am sending the user id to verify actions later
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token: token,
          _id: createdUser._id,
          username: createdUser.username
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    Authenticate the user
// @access  Public
router.post("/", (req, res) => {
  const { username, password } = req.body;

  //Simple validation
  if (!username || !password) {
    return res.status(400).json({ msg: "missing_credentials" }); //this is now not the error message itself, but part of the id of the translation
  }

  //Check for existing user
  User.findOne({ username: username }).then(loggedUser => {
    if (!loggedUser) return res.status(400).json({ msg: "wrong_credentials" }); //this is now not the error message itself, but part of the id of the translation

    //Validade the password
    bcrypt.compare(password, loggedUser.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "wrong_credentials" });

      jwt.sign(
        { _id: loggedUser._id }, // payload. I am sending the user id to verify actions later
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token: token,
            _id: loggedUser._id,
            username: loggedUser.username,
            profile_pictures: loggedUser.profile_pictures
          });
        }
      );
    });
  });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user._id)
    .select("-password")
    .then(user => res.json(user));
});

// @route    POST api/users/edit
// @desc     Update user profile
// @access   Private

router.post("/edit", auth, async (req, res) => {
  const { id, username, profilePicsArray } = req.body;

  //Profile Object
  const profileFields = {
    username,
    profile_pictures: profilePicsArray
  };

  //check if the username exists
  try {
    let existingUser = await User.findOne({ username: username });
    if (existingUser && existingUser._id != id) {
      return res.status(400).json({ msg: "existing_username" }); //check if its safe to say whats in the translation file
    }
    try {
      let foundAndEditedProfile = await User.findOneAndUpdate(
        { _id: id },
        profileFields,
        { new: true, useFindAndModify: false }
      );
      res.json(foundAndEditedProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
