// @desc      Get all prescriptions
// @route     GET /api/v1/prescription
exports.getPrescriptions = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all prescriptions' });
}

// @desc      Get single prescription
// @route     GET /api/v1/prescription/:id
exports.getPrescription = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get prescription ${req.params.id}` });
}

// @desc      Create new prescription
// @route     POST /api/v1/prescription
exports.createPrescription = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new prescription' });
}

// @desc      Update prescription
// @route     PUT /api/v1/prescription/:id
exports.updatePrescription = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update prescription ${req.params.id}` });
}

// @desc      Delete prescription
// @route     DELETE /api/v1/prescription/:id
exports.deletePrescription = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete prescription ${req.params.id}` });
}
