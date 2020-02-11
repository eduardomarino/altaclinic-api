const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Register user
// @route     POST /api/v1/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, profile, password } = req.body;

    const user = await User.create({
      name,
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
      success: true,
      token
    });
}
