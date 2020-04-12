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
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  //Simple validation
  if (!username || !password) {
    return res.status(400).json({
      msg: "missing_register_fields" //this is now not the error message itself, but part of the id of the translation
    });
  }

  //Check for existing user
  User.findOne({ username: username }).then(user => {
    if (user) return res.status(400).json({ msg: "existing_username" }); //check if its safe to say whats in the translation file
    const newUser = new User({
      username,
      password
    });

    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { _id: user._id }, // payload. I am sending the user id to verify actions later
            config.get("jwtSecret"),
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token: token,
                _id: user._id,
                username: user.username
              });
            }
          );
        });
      });
    });
  });
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
            profile_pictures: loggedUser.profile_pictures,
            email: loggedUser.email
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
