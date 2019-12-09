const User = require('../models/User');

// @desc      Get all users
// @route     GET /api/v1/user
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, total: users.length, data: users });

  } catch(err) {
    return res.status(400).json({ success: false, error: err });
  }
}

// @desc      Get single user
// @route     GET /api/v1/user/:userId
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(400).json({ success: false, message: 'User is not found.' });
    }

    return res.status(200).json({ success: true, data: user });

  } catch(err) {
    return res.status(400).json({ success: false, error: err });
  }
}

// @desc      Create new user
// @route     POST /api/v1/user
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({ success: true, data: user });

  } catch(err) {
    return res.status(400).json({ success: false, error: err });
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
      return res.status(400).json({ success: false, message: 'User is not found.' });
    }

    return res.status(200).json({ success: true, data: user });

  } catch(err) {
    return res.status(400).json({ success: false, error: err });
  }
}

// @desc      Delete user
// @route     DELETE /api/v1/user/:userId
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(400).json({ success: false, message: 'User is not found.' });
    }

    return res.status(200).json({ success: true, data: {} });

  } catch(err) {
    return res.status(400).json({ success: false, error: err });
  }
}
