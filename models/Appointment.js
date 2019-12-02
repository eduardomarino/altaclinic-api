const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'A date is required.'],
    trim: true,
    match: [
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
      'Use a valid date.'
    ]
  },
  time: {
    type: String,
    required: [true, 'A time is required.'],
    trim: true,
    match: [
      /^(10|11|12|[1-9]):[0-5][0-9]$/,
      'Use a valid time.'
    ]
  },
  patient: {
    type: String,
    required: [true, 'A patient is required.'],
    trim: true,
    maxlength: [50, 'Patient name can not be more than 50 characters.']
  },
  physician: {
    type: String,
    required: [true, 'A physician is required.'],
    trim: true,
    maxlength: [50, 'Physician name can not be more than 50 characters.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
