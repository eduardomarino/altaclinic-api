const mongoose = require('mongoose');

const ExaminationSchema = new mongoose.Schema({
  examination: {
    type: String,
    required: [true, 'Examination detail is required'],
    trim: true,
    maxlength: [5000, 'Examination detail can not be more than 5000 characters']
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

module.exports = mongoose.model('Examination', ExaminationSchema);
