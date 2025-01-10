const express = require('express');
const app = express();
const errorHandler = require('./errorHandler.js');

app.use(errorHandler);

app.use('/example', async (req, res, next) => {
  try {
    const err = new Error('Something went wrong');
    next(err);
  } catch (error) {
    next(error);
  }
});

app.listen(3000, function () {
  console.log(`Server is listening on port 3000....`);
});
