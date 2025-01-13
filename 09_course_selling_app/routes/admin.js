require('dotenv').config();

const express = require('express');
const adminRouter = express.Router();
const Admin = require('../models/admin.model.js').adminModel;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const z = require('zod');
adminRouter.post('/signup', async (req, res, next) => {
  const { email, password, firstname, lastname } = req.body;

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
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.errors.map((err) => err.message),
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await Admin.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });
    res.json({
      success: true,
      message: 'signin successful',
    });
  } catch (error) {
    next(error);
  }
});

adminRouter.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({
      email,
    });
    if (!admin) {
      return res.status(403).json({
        message: 'Invalid Credentials',
      });
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        message: 'Invalid Credentials', // If password doesn't match
      });
    }
    //// jwt token

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_ADMIN
    );
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
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
