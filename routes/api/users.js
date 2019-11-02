const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Bringing User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, username, password } = req.body;

  //Simple validation
  if (!name || !email || !username || !password) {
    return res.status(400).json({ msg: "Pls enter all fields" });
  }

  //Check for existing user
  User.findOne({ email: email }).then(user => {
    if (user) return res.status(400).json({ msg: "email already exists" }); //check if its safe to say this
    User.findOne({ username: username }).then(user => {
      if (user) return res.status(400).json({ msg: "username already exists" }); //check if its safe to say this
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
              { id: user.id }, // payload. I am sending the user id to verify actions later
              config.get("jwtSecret"),
              { expiresIn: 360000 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token: token,
                  user: {
                    id: user.id,
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

module.exports = router;
