const express = require('express');
const userRouter = express.Router();

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
