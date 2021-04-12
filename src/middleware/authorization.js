const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

// Protect routes
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(new ErrorResponse('Not authorized', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    return next();

  } catch(err) {
    return next(new ErrorResponse('Not authorized', 401));
  }
}

// Roles control
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.profile)) {
      return next(new ErrorResponse('Not authorized to access this resource', 403));
    }
    next();
  };
}
