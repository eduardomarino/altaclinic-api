// @desc      Get all appointments
// @route     GET /api/v1/appointment
exports.getAllAppointments = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all appointments' });
}

// @desc      Get single appointment
// @route     GET /api/v1/appointment/:appointmentId
exports.getAppointment = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Get appointment ${req.params.appointmentId}`
  });
}

// @desc      Create new appointment
// @route     POST /api/v1/appointment
exports.createAppointment = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new appointment' });
}

// @desc      Update appointment
// @route     PUT /api/v1/appointment/:appointmentId
exports.updateAppointment = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update appointment ${req.params.appointmentId}`
  });
}

// @desc      Delete appointment
// @route     DELETE /api/v1/appointment/:appointmentId
exports.deleteAppointment = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete appointment ${req.params.appointmentId}`
  });
}
