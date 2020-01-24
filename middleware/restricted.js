const bcrypt = require('bcryptjs');

const usersModel = require('../models/users-model.js');

const restricted = source => {
  const errorMessage = {
    message: 'You shall not pass!',
  };

  return async (req, res, next) => {
    let username;
    let password;
    try {
      switch (source) {
        case 'headers':
          username = req.headers.username;
          password = req.headers.password;
          break;
        case 'body':
          username = req.body.username;
          password = req.body.password;
          break;
        default:
      }

      // make sure the values aren't empty
      if (!username || !password) {
        return res.status(403).json(errorMessage);
      }

      // make sure user exists in the database
      const [user] = await usersModel.findBy({ username });
      if (!user) {
        return res.status(403).json(errorMessage);
      }

      const isValid = await bcrypt.compare(password, user.password);
      // make sure password is correct
      if (!isValid) {
        return res.status(403).json(errorMessage);
      }

      // if we reach this point, the user is authenticated!
      // save the user object on the request
      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = restricted;
