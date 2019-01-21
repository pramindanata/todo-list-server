const mongoose = require('../../lib/mongoose');

const schema = new mongoose.Schema({
  title: {
    maxlength: 30,
    required: true,
    trim: true,
    type: String,
  },
  content: {
    required: true,
    trim: true,
    type: String,
  },
  author: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Post = mongoose.model('Post', schema);

module.exports = Post;
