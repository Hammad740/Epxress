const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstname: String,
    lastname: String,
  },
  { timestamps: true }
);

const adminModel = mongoose.model('Admin', adminSchema);

module.exports = adminModel;
