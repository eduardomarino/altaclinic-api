const mongoose = require('mongoose');
const slugify = require('slugify');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required.'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters.']
  },
  slug: String,
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
  profile: {
    type: [String],
    required: true,
    enum: [
      'Admin',
      'Physician',
      'Receptionist'
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create slug
UserSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('User', UserSchema);
