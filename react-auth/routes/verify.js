const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');

const User = require('..//models/User');

require('dotenv').config();

router.post('/', async (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  console.log('making api call to /verify');

    const decoded = jwt.verify(token, 'secret');
    console.log(req.body);
    if (decoded.user.id.email === req.body.email) {
      res.status(201).json({ user: decoded.user });
    } else {
      res.status(500).json({ msg: 'Failed to receive user data' });
    }
});

module.exports = router;
