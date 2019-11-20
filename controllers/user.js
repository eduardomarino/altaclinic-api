// @desc      Get all users
// @route     GET /api/v1/user
exports.getAllUsers = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all users' });
}

// @desc      Get single user
// @route     GET /api/v1/user/:userId
exports.getUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Get user ${req.params.userId}`
  });
}

// @desc      Create new user
// @route     POST /api/v1/user
exports.createUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new user' });
}

// @desc      Update user
// @route     PUT /api/v1/user/:userId
exports.updateUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update user ${req.params.userId}`
  });
}

// @desc      Delete user
// @route     DELETE /api/v1/user/:userId
exports.deleteUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete user ${req.params.userId}`
  });
}
