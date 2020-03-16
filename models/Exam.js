const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  exam: {
    type: String,
    required: true,
    enum: [
      'Type 1',
      'Type 2',
      'Type 3',
      'Type 4'
    ]
  },
  detail: {
    type: String,
    required: [true, 'A detail is required.'],
    trim: true,
    maxlength: [500, 'Detail can not be more than 500 characters.']
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: [true, 'A patient is required.']
  },
  physician: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A physician is required.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Exam', ExamSchema);
