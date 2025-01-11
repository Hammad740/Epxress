const express = require('express');
const adminRouter = express.Router();

adminRouter.get('/signup', (req, res) => {
  res.json({
    message: 'signup',
  });
});

adminRouter.post('/signin', (req, res) => {
  res.json({
    message: 'signin',
  });
});

adminRouter.post('/course', (req, res) => {
  res.json({
    message: 'course',
  });
});
adminRouter.get('/course/bulk', (req, res) => {
  res.json({
    message: 'course',
  });
});
adminRouter.put('/course', (req, res) => {
  res.json({
    message: 'course',
  });
});
module.exports = adminRouter;
