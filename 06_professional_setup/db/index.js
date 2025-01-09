require('dotenv').config();

const mongoose = require('mongoose');
const { DB_NAME } = require('../constant.js');

const connectDB = async () => {
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

connectDB();

module.exports = connectDB;
