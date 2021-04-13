const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'A date is required']
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

module.exports = mongoose.model('Appointment', AppointmentSchema);
