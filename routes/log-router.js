const express = require('express');

const restricted = require('../middleware/restricted.js');

const router = express.Router();

// log in as an existing user
router.post('/', restricted('body'), async (req, res, next) => {
  try {
    // user already validated by middleware
    res.status(200).json({
      message: `Logged in as ${req.user.username}!`,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
