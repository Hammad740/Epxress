const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const purchaseModel = mongoose.model('Purchase', purchaseSchema);
