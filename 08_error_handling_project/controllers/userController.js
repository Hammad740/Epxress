const User = require('../models/userModel.js');

const asyncHandler = require('../utils/asyncHandler.js');

const CustomError = require('../utils/customError.js');

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    data: users,
  });
});

const createUser = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new CustomError('Email already registered', 400));
  }

  const user = await User.create({ name, email });
  res.status(201).json({
    success: true,
    data: user,
  });
});

module.exports = {
  getAllUsers,
  createUser,
};
