const express = require('express');

const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const User = require('../models/User');

const jwt = require('jsonwebtoken');

const router = express.Router();
// const app = require('express');
// const http = require('http');
// const WebSocket = require('ws');

// const httpServer = http.createServer(app);
// const wss = new WebSocket.Server({ 'server': httpServer });

// const clients = {};

// // This code generates unique userid for everyuser.
// const getUniqueID = () => {
//   const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
//   return s4() + s4() + '-' + s4();
// };


// Register a User

router.post('/', [
  check('name', 'Please enter your name').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check('mobile', 'Please enter your mobile').not().isEmpty(),
  check('password', 'Please enter a password that is longer than 6 characters').isLength({ min: 6 }),
// eslint-disable-next-line consistent-return
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, email,mobile, password } = req.body;
  // console.log(req.body)

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ msg: 'User already exists' });
      return;
    }

    

    user = new User({
      name,
      email,
      mobile,
      password,
    });

    await User.find().cursor().eachAsync(async (model) => {
       console.log('do work with model: ', model);
       const send = require('gmail-send')({
        user: req.body.email,
        pass: req.body.password,
        to: model.email,
        subject: "News!",
        text: req.body.email + 'user created!'
       });
       const result = send() // Using default parameters
          .then((res) => {
            console.log('* then: res.result:', res.result);
            // full response from Nodemailer:
            // console.log('* [promise-example-1] then: res.full:', res.full);
          })
          .catch((error) => {
            console.log('ERROR:', error);
            console.log('* catch: error:', error);
          });
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      },
    );



    // const send = require('gmail-send')({
    //   user: email,
    //   password:req.body.password,
    //   to: 
    // })

    // var userID = getUniqueID();
    // console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
    // // You can rewrite this part of the code to accept only the requests from allowed origin
    // const connection = request.accept(null, request.origin);
    // clients[userID] = connection;
    // console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
  } catch (err) {
    // eslint-disable-next-line
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error!' });
  }
});


module.exports = router;
