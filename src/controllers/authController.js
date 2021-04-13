const crypto = require('crypto');
const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Private/Admin
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, profile, password } = req.body;

    const user = await User.create({
      firstName,
      lastName,
      email,
      profile,
      password
    });

    return sendTokenResponse(user, 200, res);

  } catch(err) {
    return next(err);
  }
}

// @desc      Login user
// @route     POST /api/v1/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate credentials
    if (!email || !password) {
      return next(new ErrorResponse('Provide an e-mail and password', 400));
    }

    // Check e-mail and password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Compare password
    isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    return sendTokenResponse(user, 200, res);

  } catch(err) {
    return next(err);
  }
}

// @desc      Get logged user
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    return res.status(200).json({ data: user });

  } catch(err) {
    return next(err);
  }
}

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorResponse('There is no user with that e-mail', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Get reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this e-mail because you (or someone else) has
      requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password reset token',
        message
      });

      res.status(200).json({ data: 'E-mail sent' });

    } catch(err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorResponse('E-mail could not be sent', 500));
    }

    return res.status(200).json({ data: user });

  } catch(err) {
    return next(err);
  }
}

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resetToken
exports.resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }  // greater than now
    });

    if (!user) {
      return next(new ErrorResponse('Invalid token', 400));
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return sendTokenResponse(user, 200, res);

  } catch(err) {
    return next(err);
  }
}

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.comparePassword(req.body.currentPassword))) {
      return next(new ErrorResponse('Invalid password', 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    return sendTokenResponse(user, 200, res);

  } catch(err) {
    return next(err);
  }
}

// Get token, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedToken();
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true // access only client side
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  return res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      token,
      name: user.name,
      profile: user.profile
    });
}
