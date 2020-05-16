const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, 'A date is required'],
    trim: true,
    match: [
      /(\d{4})[-.\/](\d{2})[-.\/](\d{2})/,
      'Use a valid date'
    ]
  },
  time: {
    type: String,
    required: [true, 'A time is required'],
    trim: true,
    match: [
      /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/,
      'Use a valid time'
    ]
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Electrocardiography',
      'Echocardiography',
      'Ultrasound',
      'Magnetic Resonance',
      'Mammography',
      'Blood Analysis'
    ]
  },
  detail: {
    type: String,
    required: [true, 'Exam detail is required'],
    trim: true,
    maxlength: [500, 'Exam detail can not be more than 500 characters']
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: [true, 'A patient is required']
  },
  physician: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A physician is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Exam', ExamSchema);
