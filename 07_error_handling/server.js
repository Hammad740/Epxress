const express = require('express');
const app = express();
const errorClass = require('./errorClass.js');
app.use(express.json());

app.get('/error', (req, res, next) => {
  try {
    throw new Error('Something went wrong');
  } catch (error) {
    next(error);
  }
});
app.get('/error-class', (req, res, next) => {
  try {
    throw new errorClass('Something went wrong', 400);
  } catch (error) {
    next(error);
  }
});

function globalErrorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
}

app.use(globalErrorHandler);

app.listen(4000, () => {
  console.log(`Server is listening on port 4000...`);
});
