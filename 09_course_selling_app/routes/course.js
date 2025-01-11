const express = require('express');
const courseRouter = express.Router();

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
