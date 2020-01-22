// initialize and start up the server

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

/*
const regRouter = require('./routes/reg-router.js');
const logRouter = require('./routes/log-router.js');
const usersRouter = require('./routes/users-router.js');
const defaultRouter = require('./routes/default-router.js');
*/

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 5000;

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

/*
// api/register: register a new user
server.use('/api/register', regRouter);

// api/login: log in as an existing user
server.use('/api/login', logRouter);

// api/users: get user info
server.use('/api/users', usersRouter);

// let the caller know the server is up and running
server.use('/', defaultRouter(host, port));
*/

server.use('/', (req, res) => {
	res.json({ message: `Server listening at ${host} on port ${port}`});
});

// catch-all error handler
server.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Server error',
  });
});

// start the server
server.listen(port, host, () => {
  console.log(`Server listening at ${host} on port ${port}`);
});
