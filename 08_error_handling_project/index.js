require('dotenv').config();

const app = require('./app.js');
const { PORT } = require('./constants.js');

const connectDb = require('./db/index.js');

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on Port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message);
  });
