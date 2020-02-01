const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all users
// @route     GET /api/v1/user
exports.getAllUsers = async (req, res, next) => {
  try {
    const reqQuery = { ...req.query };

    const removeFields = ['select', 'sort'];

    // Delete fields from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, $lt, $lte and $in)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    let query = User.find(JSON.parse(queryStr));

    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Default sort
    }

    const users = await query;

    return res.status(200).json({
      success: true,
      total: users.length,
      data: users
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Get single user
// @route     GET /api/v1/user/:userId
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

// @desc      Create new user
// @route     POST /api/v1/user
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({
      success: true,
      data: user
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Update user
// @route     PUT /api/v1/user/:userId
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true
    });

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
// @route     DELETE /api/v1/user/:userId
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
