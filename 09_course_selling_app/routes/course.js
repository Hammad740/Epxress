const express = require('express');
const courseRouter = express.Router();
const Purchase = require('../models/purchase.model.js').purchaseModel;

const { authUserMiddleware } = require('../middlewares/authUserMiddleware.js');
courseRouter.post(
  '/purchase',

  authUserMiddleware,
  async (req, res, next) => {
    const userId = req.userId;
    const { courseId } = req.body;

    try {
      const purchase = await Purchase.create({
        userId,
        courseId,
      });
    } catch (error) {
      next(error);
    }
    res.json({
      success: true,
      message: 'course purchased successfully',
    });
  }
);
courseRouter.get('/preview', async (req, res) => {
  const purchases = await Purchase.find({});
  res.json({
    success: true,
    message: 'preview of courses',
    purchases,
  });
});

courseRouter.get('/purchased', authUserMiddleware, async (req, res) => {
  const userId = req.userId;

  const purchasedCourses = await Purchase.find({
    userId,
  });

  res.json({
    success: true,
    message: 'purchased courses',
    purchasedCourses,
  });
});

module.exports = courseRouter;
