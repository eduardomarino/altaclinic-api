const mongoose = require('mongoose');
const slugify = require('slugify');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required.'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters.']
  },
  slug: String,
  birthdate: {
    type: Date,
    required: [true, 'Birthdate is required.'],
    trim: true,
    match: [
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
      'Use a valid birthdate.'
    ]
  },
  cpf: {
    type: String,
    required: [true, 'CPF is required.'],
    unique: true,
    trim: true,
    match: [
      /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
      'Use a valid CPF.'
    ]
  },
  healthPlan: {
    type: String,
    required: true,
    enum: [
      'None',
      'Plan 1',
      'Plan 2',
      'Plan 3'
    ]
  },
  email: {
    type: String,
    required: [true, 'A e-mail is required.'],
    unique: true,
    trim: true,
    maxlength: [50, 'E-mail can not be more than 50 characters.'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Use a valid e-mail.'
    ]
  },
  telephone: {
    type: String,
    required: [true, 'A telephone number is required.'],
    trim: true,
    match: [
      /^\(\d{2}\) \d{4,5}-\d{4}$/gi,
      'Use a valid telephone number.'
    ]
  },
  address: {
    type: String,
    required: [true, 'A address is required.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create slug
PatientSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Patient', PatientSchema);
