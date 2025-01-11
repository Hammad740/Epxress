const express = require('express');
const app = express();
const userRouter = require('./routes/user.js');
const courseRouter = require('./routes/course.js');
const adminRouter = require('./routes/admin.js');

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/admin', adminRouter);

app.listen(3000, () => {
  console.log(`Server is listening on port 3000...`);
});

module.exports = app;
