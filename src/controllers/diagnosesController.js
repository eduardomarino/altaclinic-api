const Diagnosis = require('../models/diagnosisModel');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all diagnoses
// @route     GET /api/v1/diagnoses
// @access    Private/Physician/Admin
exports.getAllDiagnoses = async (req, res, next) => {
  try {
    // Get all patient diagnoses
    if (req.query.patientId) {
      let query;

      query = Diagnosis.find({ patient: req.query.patientId }).populate({
        path: 'patient physician',
        select: 'firstName lastName age telephone email healthInsurance'
      });

      const diagnoses = await query;

      if (diagnoses.length === 0) {
        return next(
          new ErrorResponse(`Diagnoses not found with patientId: ${req.query.patientId}`, 404)
        );
      }

      return res.status(200).json({ data: diagnoses });
    }

    // Get all diagnoses
    return res.status(200).json(res.resultsHandler);

  } catch(err) {
    return next(err);
  }
}

// @desc      Get single diagnosis
// @route     GET /api/v1/diagnoses/:diagnosisId
// @access    Private/Physician/Admin
exports.getDiagnosis = async (req, res, next) => {
  try {
    const diagnosis = await Diagnosis.findById(req.params.diagnosisId);

    if (!diagnosis) {
      return next(
        new ErrorResponse(`Diagnosis not found with diagnosisId: ${req.params.diagnosisId}`, 404)
      );
    }

    return res.status(200).json({ data: diagnosis });

  } catch(err) {
    return next(err);
  }
}

// @desc      Create new diagnosis
// @route     POST /api/v1/diagnoses
// @access    Private/Physician/Admin
exports.createDiagnosis = async (req, res, next) => {
  try {
    const diagnosis = await Diagnosis.create(req.body);
    return res.status(201).json({ data: diagnosis });

  } catch(err) {
    return next(err);
  }
}

// @desc      Update diagnosis
// @route     PUT /api/v1/diagnoses/:diagnosisId
// @access    Private/Physician/Admin
exports.updateDiagnosis = async (req, res, next) => {
  try {
    const diagnosis = await Diagnosis.findByIdAndUpdate(req.params.diagnosisId, req.body, {
      new: true,
      runValidators: true
    });

    if (!diagnosis) {
      return next(
        new ErrorResponse(`Diagnosis not found with diagnosisId: ${req.params.diagnosisId}`, 404)
      );
    }

    return res.status(200).json({ data: diagnosis });

  } catch(err) {
    return next(err);
  }
}

// @desc      Delete diagnosis
// @route     DELETE /api/v1/diagnoses/:diagnosisId
// @access    Private/Physician/Admin
exports.deleteDiagnosis = async (req, res, next) => {
  try {
    const diagnosis = await Diagnosis.findByIdAndDelete(req.params.diagnosisId);

    if (!diagnosis) {
      return next(
        new ErrorResponse(`Diagnosis not found with diagnosisId: ${req.params.diagnosisId}`, 404)
      );
    }

    return res.status(204);

  } catch(err) {
    return next(err);
  }
}
