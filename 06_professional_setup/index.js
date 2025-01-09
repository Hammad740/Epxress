require('dotenv').config();

const { PORT } = require('./constant.js');
const connectDB = require('./db/index.js');

connectDB()
  .then(() => {
    const app = require('./app.js');

    app.listen(PORT, () => {
      console.log(`Server is listening on Port ${PORT}...`);
    });
  })
  .catch(() => {
    console.log('Error connecting to MongoDB');
  });
