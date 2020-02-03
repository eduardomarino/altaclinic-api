const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Register user
// @route     GET /api/v1/auth/register
exports.register = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true });

  } catch(err) {
    return next(err);
  }
}
