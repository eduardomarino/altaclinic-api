const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all users
// @route     GET /api/v1/users
// @access    Private/Admin
exports.getAllUsers = (req, res, next) => {
  try {
    return res.status(200).json(res.resultsHandler);

  } catch(err) {
    return next(err);
  }
}

// @desc      Get single user
// @route     GET /api/v1/users/:userId
// @access    Private/Admin
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id: ${req.params.userId}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: user
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Delete user
// @route     DELETE /api/v1/users/:userId
// @access    Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id: ${req.params.userId}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch(err) {
    return next(err);
  }
}
