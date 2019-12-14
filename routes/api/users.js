const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Bringing User and Article Models
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, username, password } = req.body;

  //Simple validation
  if (!name || !email || !username || !password) {
    return res.status(400).json({
      msg: "missing_register_fields" //this is now not the error message itself, but part of the id of the translation
    });
  }

  //Check for existing user
  User.findOne({ email: email }).then(user => {
    if (user) return res.status(400).json({ msg: "existing_email" }); //check if its safe to say whats in the translation file
    User.findOne({ username: username }).then(user => {
      if (user) return res.status(400).json({ msg: "existing_username" }); //check if its safe to say whats in the translation file
      const newUser = new User({
        name,
        email,
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
                  user: {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                  }
                });
              }
            );
          });
        });
      });
    });
  });
});

// @route   GET api/users/:id
// @desc    Get one user by its id
// @access  Public
router.get("/:id", (req, res) => {
  User.findById(req.params.id).then(user => res.json(user));
});

module.exports = router;
