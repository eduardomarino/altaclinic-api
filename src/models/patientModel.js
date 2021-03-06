const mongoose = require('mongoose');
const slugify = require('slugify');

const PatientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [25, 'First name can not be more than 25 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [25, 'Last name can not be more than 25 characters']
  },
  slug: String,
  age: {
    type: String,
    required: [true, 'Age is required'],
  },
  cpf: {
    type: String,
    required: [true, 'CPF is required'],
    unique: true,
    trim: true,
    match: [
      /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
      'Use a valid CPF'
    ]
  },
  healthInsurance: {
    type: String,
    trim: true,
    maxlength: [25, 'Health Insurance can not be more than 25 characters'],
    default: 'None'
  },
  email: {
    type: String,
    required: [true, 'An e-mail is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'E-mail can not be more than 50 characters'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Use a valid e-mail'
    ]
  },
  telephone: {
    type: String,
    required: [true, 'A telephone number is required'],
    trim: true,
    match: [
      /^\([1-9]{2}\) [0-9]{4,5}-[0-9]{4}$/,
      'Use a valid telephone number'
    ]
  },
  address: {
    type: String,
    required: [true, 'An address is required'],
    maxlength: [100, 'Address can not be more than 100 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create slug
PatientSchema.pre('save', function(next) {
  const str = `${this.firstName} ${this.lastName}`;
  this.slug = slugify(str, { lower: true });
  next();
});

module.exports = mongoose.model('Patient', PatientSchema);
