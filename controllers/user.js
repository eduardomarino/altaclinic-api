const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all users
// @route     GET /api/v1/user
exports.getAllUsers = async (req, res, next) => {
  try {
    const reqQuery = { ...req.query };

    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Delete fields from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, $lt, $lte and $in)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    let query = User.find(JSON.parse(queryStr));

    // Select
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Default sort
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await User.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const users = await query;

    // Pagination data
    const pagination = {
      limit
    };

    if (endIndex < total) {
      pagination.nextPage = page + 1;
    }

    if (startIndex > 0) {
      pagination.prevPage = page - 1;
    }

    return res.status(200).json({
      success: true,
      total: users.length,
      pagination,
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
