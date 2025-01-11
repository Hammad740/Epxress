const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstname: String,
    lastname: String,
  },
  { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
