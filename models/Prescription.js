const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  prescription: {
    type: String,
    required: [true, 'A prescription is required'],
    trim: true,
    maxlength: [500, 'Prescription can not be more than 500 characters']
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
