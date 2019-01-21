const mongoose = require('../../lib/mongoose');

const schema = new mongoose.Schema({
  title: {
    maxlength: 100,
    required: true,
    trim: true,
    type: String,
  },
  completed: {
    default: false,
    required: true,
    type: Boolean,
  },
  completedAt: {
    default: null,
    type: Date,
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Todo = mongoose.model('Todo', schema);

module.exports = Todo;
