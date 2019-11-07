// @desc      Get all appointment history
// @route     GET /api/v1/appointment-history
exports.getAllAppointmentHistory = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all appointment history' });
}

// @desc      Get single appointment history
// @route     GET /api/v1/appointment-history/:id
exports.getAppointmentHistory = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get appointment history ${req.params.id}` });
}

// @desc      Create new appointment history
// @route     POST /api/v1/appointment-history
exports.createAppointmentHistory = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new appointment history' });
}

// @desc      Update appointment history
// @route     PUT /api/v1/appointment-history/:id
exports.updateAppointmentHistory = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update appointment history ${req.params.id}` });
}

// @desc      Delete appointment history
// @route     DELETE /api/v1/appointment-history/:id
exports.deleteAppointmentHistory = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete appointment history ${req.params.id}` });
}
