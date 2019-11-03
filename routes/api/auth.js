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
    return res.status(400).json({ msg: "Prencha os dois campos, faz favor" });
  }

  //Check for existing user
  User.findOne({ username: username }).then(user => {
    if (!user)
      return res
        .status(400)
        .json({ msg: "Você errou o nome de cacura ou a senha" }); //check if its safe to say this

    //Validade the password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res
          .status(400)
          .json({ msg: "Você errou o nome de cacura ou a senha" });

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

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;