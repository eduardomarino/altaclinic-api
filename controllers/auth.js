const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Register user
// @route     GET /api/v1/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, profile, password } = req.body;

    const user = await User.create({
      name,
      email,
      profile,
      password
    });

    return res.status(200).json({ success: true });

  } catch(err) {
    return next(err);
  }
}
