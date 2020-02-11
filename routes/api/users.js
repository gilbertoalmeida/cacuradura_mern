const express = require("express");
const router = express.Router();

//Bringing User and Article Models
const User = require("../../models/User");

// @route   GET api/users/:id
// @desc    Get one user by its id
// @access  Public
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .select("-password")
    .then(loadedUser => res.json(loadedUser));
});

module.exports = router;
