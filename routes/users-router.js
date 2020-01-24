const express = require('express');

const usersModel = require('../models/users-model.js');
const restricted = require('../middleware/restricted.js');

const router = express.Router();

// get all users and return to caller
router.get('/', restricted('headers'), async (req, res, next) => {
  try {
    const users = await usersModel.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
