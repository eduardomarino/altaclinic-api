// @desc      Get all clinic history
// @route     GET /api/v1/clinic-history
exports.getAllClinicHistory = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all clinic history' });
}

// @desc      Get single clinic history
// @route     GET /api/v1/clinic-history/:id
exports.getClinicHistory = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get clinic history ${req.params.id}` });
}

// @desc      Create new clinic history
// @route     POST /api/v1/clinic-history
exports.createClinicHistory = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new clinic history' });
}

// @desc      Update clinic history
// @route     PUT /api/v1/clinic-history/:id
exports.updateClinicHistory = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update clinic history ${req.params.id}` });
}

// @desc      Delete clinic history
// @route     DELETE /api/v1/clinic-history/:id
exports.deleteClinicHistory = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete clinic history ${req.params.id}` });
}
