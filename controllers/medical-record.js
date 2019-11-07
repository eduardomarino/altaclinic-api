// @desc      Get all medical record
// @route     GET /api/v1/medical-record
exports.getAllMedicalRecord = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all medical record' });
}

// @desc      Get single medical record
// @route     GET /api/v1/medical-record/:id
exports.getMedicalRecord = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get medical record ${req.params.id}` });
}

// @desc      Create new medical record
// @route     POST /api/v1/medical-record
exports.createMedicalRecord = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new medical record' });
}

// @desc      Update medical record
// @route     PUT /api/v1/medical-record/:id
exports.updateMedicalRecord = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update medical record ${req.params.id}` });
}

// @desc      Delete medical record
// @route     DELETE /api/v1/medical-record/:id
exports.deleteMedicalRecord = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete medical record ${req.params.id}` });
}
