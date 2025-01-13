const express = require('express');
const app = express();
const userRouter = require('./routes/user.js');
const courseRouter = require('./routes/course.js');
const adminRouter = require('./routes/admin.js');
const errorHandler = require('./middlewares/errorHandler.js');
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/admin', adminRouter);

app.use(errorHandler);

module.exports = app;
