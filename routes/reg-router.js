const express = require('express');

const usersModel = require('../models/users-model.js');

const router = express.Router();

// register a new user
router.post('/', async (req, res, next) => {
  try {
    // try to add the user
    const newUser = await usersModel.add(req.body);
    // if it was successful...
    res.status(201).json(newUser);
  } catch (err) {
    // if it was a unique constraint error:
    if (err.message.includes('SQLITE_CONSTRAINT: UNIQUE')) {
      res.status(403).json({
        message: 'Username unavailable, please select another',
      });
    }
    // otherwise:
    next(err);
  }
});

module.exports = router;
