require('dotenv').config();
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.model.js').userModel;
const bcrypt = require('bcrypt');
const z = require('zod');
const jwt = require('jsonwebtoken');

userRouter.post('/signup', async (req, res, next) => {
  const signupSchema = z.object({
    email: z.string().email({
      message: 'Invalid email address',
    }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    firstname: z.string().min(3, { message: 'Firstname is required' }),
    lastname: z.string().min(3, { message: 'Lastname is required' }),
  });

  const { email, password, firstname, lastname } = req.body;

  // validate data using zod
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.errors.map((err) => err.message),
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });
    res.json({
      success: true,
      message: 'signup successful',
    });
  } catch (error) {
    next(error);
  }
});
userRouter.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({
        message: 'Invalid Credentials', // If user is not found
      });
    }

    // Compare provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        message: 'Invalid Credentials', // If password doesn't match
      });
    }

    // Create JWT token if credentials are valid
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_USER
    );

    return res.json({
      message: 'Success login',
      token,
    });
  } catch (error) {
    next(error);
  }
});
userRouter.get('/purchases', (req, res) => {
  res.json({
    message: 'purchases',
  });
});
module.exports = userRouter;
