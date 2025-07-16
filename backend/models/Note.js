const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  category: {
    type: String,
    enum: ['General', 'Programming', 'Design', 'Business', 'Personal'],
    default: 'General'
  }
});

module.exports = mongoose.model('Note', noteSchema);
