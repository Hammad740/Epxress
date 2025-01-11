const express = require('express');
const app = express();
const userController = require('./controllers/userController.js');
const errorHandler = require('./middlewares/errorMiddleware.js');
require('./utils/customError.js');
const CustomError = require('./utils/customError.js');

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.get('/users', userController.getAllUsers);
app.post('/users', userController.createUser);

// Catch all route for invalid paths
app.use((req, res, next) => {
  next(new CustomError('Route not found', 404));
});

// Error handler middleware
app.use(errorHandler);

module.exports = app;
