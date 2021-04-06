const Patient = require('../models/Patient');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all patients
// @route     GET /api/v1/patients
// @access    Private/User/Admin
exports.getAllPatients = (req, res, next) => {
  try {
    return res.status(200).json(res.resultsHandler);

  } catch(err) {
    return next(err);
  }
}

// @desc      Get single patient
// @route     GET /api/v1/patients/:patientId
// @access    Private/User/Admin
exports.getPatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.patientId);

    if (!patient) {
      return next(
        new ErrorResponse(`Patient not found with id: ${req.params.patientId}`, 404)
      );
    }

    return res.status(200).json({ data: patient });

  } catch(err) {
    return next(err);
  }
}

// @desc      Create new patient
// @route     POST /api/v1/patients
// @access    Private/User/Admin
exports.createPatient = async (req, res, next) => {
  try {
    const patient = await Patient.create(req.body);
    return res.status(201).json({ data: patient });

  } catch(err) {
    return next(err);
  }
}

// @desc      Update patient
// @route     PUT /api/v1/patients/:patientId
// @access    Private/User/Admin
exports.updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.patientId, req.body, {
      new: true,
      runValidators: true
    });

    if (!patient) {
      return next(
        new ErrorResponse(`Patient not found with id: ${req.params.patientId}`, 404)
      );
    }

    return res.status(200).json({ data: patient });

  } catch(err) {
    return next(err);
  }
}

// @desc      Delete patient
// @route     DELETE /api/v1/patients/:patientId
// @access    Private/User/Admin
exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.patientId);

    if (!patient) {
      return next(
        new ErrorResponse(`Patient not found with id: ${req.params.patientId}`, 404)
      );
    }

    return res.status(204);

  } catch(err) {
    return next(err);
  }
}
