const express = require('express');
const courseRouter = express.Router();
const courseModel = require('../models/course.model.js');
courseRouter.post('/course/purchase', (req, res) => {
  res.json({
    message: 'purchase',
  });
});
courseRouter.get('/course/preview', (req, res) => {
  res.json({
    message: 'preview',
  });
});

module.exports = courseRouter;
