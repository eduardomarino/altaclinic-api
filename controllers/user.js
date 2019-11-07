// @desc      Get all users
// @route     GET /api/v1/user
exports.getUsers = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all users' });
}

// @desc      Get single user
// @route     GET /api/v1/user/:id
exports.getUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get user ${req.params.id}` });
}

// @desc      Create new user
// @route     POST /api/v1/user
exports.createUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new user' });
}

// @desc      Update user
// @route     PUT /api/v1/user/:id
exports.updateUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update user ${req.params.id}` });
}

// @desc      Delete user
// @route     DELETE /api/v1/user/:id
exports.deleteUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete user ${req.params.id}` });
}
