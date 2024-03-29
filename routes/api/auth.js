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

  //removing everything that isn't a letter, number or . or _
  // then trimming white spaces
  usernameEdited = username
    .replace(/[^a-zA-Z0-9_.]/gi, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

  if (usernameEdited.length > 30) {
    return res.status(400).json({
      msg: "big_username"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      msg: "small_password"
    });
  } else if (password.length > 50) {
    return res.status(400).json({
      msg: "big_password"
    });
  }

  try {
    //checking if username exists
    let existingUser = await User.findOne({ username: usernameEdited });
    if (existingUser) {
      return res.status(400).json({ msg: "existing_username" });
    }

    const newUser = new User({
      username: usernameEdited,
      password
    });

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    jwt.sign(
      { _id: newUser._id }, // payload. I am sending the user id to verify actions later
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token: token,
          _id: newUser._id,
          username: newUser.username,
          profile_pictures: newUser.profile_pictures
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: "server_error"
    });
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

// @route    PATCH api/users/edit
// @desc     Update user profile
// @access   Private

router.patch("/edit", auth, async (req, res) => {
  const { id, username, profilePicsArray } = req.body;

  if (!username) {
    return res.status(400).json({
      msg: "missing_username" //this is now not the error message itself, but part of the id of the translation
    });
  }

  //removing everything that isn't a letter, number or . or _
  // then trimming white spaces
  usernameEdited = username
    .replace(/[^a-zA-Z0-9_.]/gi, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

  if (usernameEdited.length > 30) {
    return res.status(400).json({
      msg: "big_username"
    });
  }

  //check if the username exists
  try {
    let existingUser = await User.findOne({ username: usernameEdited });
    if (existingUser && existingUser._id != id) {
      return res.status(400).json({ msg: "existing_username" }); //check if its safe to say whats in the translation file
    }
    try {
      //Profile Object
      const profileFields = {
        username: usernameEdited,
        profile_pictures: profilePicsArray
      };

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
    res.status(500).json({
      msg: "server_error"
    });
  }
});

module.exports = router;
