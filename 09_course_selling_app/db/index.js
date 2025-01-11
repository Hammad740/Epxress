require('dotenv').config();
const mongoose = require('mongoose');
const DB_NAME = 'course-selling-app';
const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log('Connected to MongoDB...');
    console.log('Host:', connectionInstance.connection.host);
    console.log('Database:', connectionInstance.connection.name);
  } catch (error) {
    console.log('Error connecting to MongoDB', error.message);
  }
};

module.exports = connectDb;
