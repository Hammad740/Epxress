require('dotenv').config();
const mongoose = require('mongoose');
const DB_NAME = require('../constants.js');

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log('Connected to MongoDB');
    console.log(connectionInstance.connection.host);
  } catch (error) {
    console.log('Error connecting to MongoDB', error.message);
    process.exit(1);
  }
};
connectDb();
module.exports = connectDb;
