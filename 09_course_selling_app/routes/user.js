const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/user.model.js');
userRouter.get('/signup', (req, res) => {
  res.json({
    message: 'signup',
  });
});

userRouter.post('/signin', (req, res) => {
  res.json({
    message: 'signin',
  });
});
userRouter.get('/purchases', (req, res) => {
  res.json({
    message: 'purchases',
  });
});
module.exports = userRouter;
