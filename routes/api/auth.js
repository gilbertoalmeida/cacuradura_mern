const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth"); //middleware to protect routes

//Bringing User Model
const User = require("../../models/User");

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
            name: loggedUser.name,
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
  const { name } = req.body;

  //Profile Object
  const profileFields = {};
  profileFields.name = name;

  try {
    let foundAndEditedProfile = await User.findOneAndUpdate(
      { _id: req.body.id },
      profileFields,
      { new: true, useFindAndModify: false }
    );
    res.json(foundAndEditedProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
