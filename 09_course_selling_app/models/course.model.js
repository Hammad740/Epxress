const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

const courseModel = mongoose.model('Course', courseSchema);

module.exports = courseModel;