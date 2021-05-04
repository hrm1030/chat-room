const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

const User = require('..//models/User');

require('dotenv').config();

// Login User & issue Token
router.post('/', [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Please enter a valid password').exists(),
// eslint-disable-next-line consistent-return
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Email or password is not valid' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Email or password is not valid' });
    }

    const payload = {
      user: {
        id: user,
      },
    };
    console.log(payload,'.....')

    jwt.sign(
      payload,
      'secret',
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      },
    );
  } catch (err) {
    // eslint-disable-next-line
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error!' });
  }
});

// Get User info (id)
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    // eslint-disable-next-line
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error!' });
  }
});

module.exports = router;
