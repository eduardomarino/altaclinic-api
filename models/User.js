const mongoose = require('mongoose');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  slug: String,
  email: {
    type: String,
    required: [true, 'An e-mail is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'E-mail can not be more than 50 characters'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Use a valid e-mail.'
    ]
  },
  profile: {
    type: [String],
    enum: [
      'admin',
      'physician',
      'user'
    ],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'A password is required'],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
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

// Encrypt password
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign JSON Web Token
UserSchema.methods.getSignedToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}

// Compare user entered password to hashed password
UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);
