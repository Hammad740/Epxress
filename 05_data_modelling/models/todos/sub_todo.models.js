const mongoose = require('mongoose');

const subTodosSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export const subTodos = mongoose.model('subTodos', subTodosSchema);
