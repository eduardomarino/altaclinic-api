// @desc      Get all patients
// @route     GET /api/v1/patient
exports.getPatients = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all patients' });
}

// @desc      Get single patient
// @route     GET /api/v1/patient/:id
exports.getPatient = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get patient ${req.params.id}` });
}

// @desc      Create new patient
// @route     POST /api/v1/patient
exports.createPatient = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new patient' });
}

// @desc      Update patient
// @route     PUT /api/v1/patient/:id
exports.updatePatient = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update patient ${req.params.id}` });
}

// @desc      Delete patient
// @route     DELETE /api/v1/patient/:id
exports.deletePatient = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete patient ${req.params.id}` });
}
