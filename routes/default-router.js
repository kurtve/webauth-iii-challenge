const express = require('express');

const defaultRouter = (host, port) => {
  const router = express.Router();

  const defaultPage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Hello Server</title>
        </head>
        <body>
            <h1>Hello, Server!</h1>
            <h3>Available endpoints:</h3>
            <ul>
                <li>/api/register</li>
                <li>/api/login</li>
                <li>/api/users</li>
            </ul>
            <hr>
            <p><span style="font-style:italic">
                Server listening at ${host} on port ${port}
            </span></p>
        </body>
        </html>
    `;

  // default 'proof-of-life' handling
  return router.get('/', (req, res, next) => {
    try {
      // identify server to user
      res.status(200).send(defaultPage);
    } catch (err) {
      // otherwise
      next(err);
    }
  });
};

module.exports = defaultRouter;
