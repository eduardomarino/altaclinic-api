const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
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
  prescription: {
    type: String,
    required: [true, 'A prescription is required'],
    trim: true,
    maxlength: [500, 'Prescription can not be more than 500 characters']
  },
  genericName: {
    type: String,
    required: [true, 'A generic name is required'],
    trim: true,
    maxlength: [25, 'Generic name can not be more than 25 characters']
  },
  factoryName: {
    type: String,
    required: [true, 'A factory name is required'],
    trim: true,
    maxlength: [25, 'Factory name can not be more than 25 characters']
  },
  manufacturer: {
    type: String,
    required: [true, 'A manufacturer is required'],
    trim: true,
    maxlength: [25, 'Manufacturer can not be more than 25 characters']
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

module.exports = mongoose.model('Prescription', PrescriptionSchema);
