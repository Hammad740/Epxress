const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: String,
    firstname: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: String,
    isActive: Boolean,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
