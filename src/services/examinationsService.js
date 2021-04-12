const Examination = require('../models/examinationModel');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all examinations
// @route     GET /api/v1/examinations
// @access    Private/Physician/Admin
exports.getAllExaminations = async (req, res, next) => {
  try {
    // Get all patient examinations
    if (req.query.patientId) {
      let query;

      query = Examination.find({ patient: req.query.patientId }).populate({
        path: 'patient physician',
        select: 'firstName lastName age telephone email healthInsurance'
      });

      const examinations = await query;

      if (examinations.length === 0) {
        return next(
          new ErrorResponse(`Examinations not found with patientId: ${req.query.patientId}`, 404)
        );
      }

      return res.status(200).json({ data: examinations });
    }

    // Get all examinations
    return res.status(200).json(res.resultsHandler);

  } catch(err) {
    return next(err);
  }
}

// @desc      Get single examination
// @route     GET /api/v1/examinations/:examinationId
// @access    Private/Physician/Admin
exports.getExamination = async (req, res, next) => {
  try {
    const examination = await Examination.findById(req.params.examinationId);

    if (!examination) {
      return next(
        new ErrorResponse(`Examination not found with examinationId: ${req.params.examinationId}`, 404)
      );
    }

    return res.status(200).json({ data: examination });

  } catch(err) {
    return next(err);
  }
}

// @desc      Create new examination
// @route     POST /api/v1/examinations
// @access    Private/Physician/Admin
exports.createExamination = async (req, res, next) => {
  try {
    const examination = await Examination.create(req.body);
    return res.status(201).json({ data: examination });

  } catch(err) {
    return next(err);
  }
}

// @desc      Update examination
// @route     PUT /api/v1/examinations/:examinationId
// @access    Private/Physician/Admin
exports.updateExamination = async (req, res, next) => {
  try {
    const examination = await Examination.findByIdAndUpdate(req.params.examinationId, req.body, {
      new: true,
      runValidators: true
    });

    if (!examination) {
      return next(
        new ErrorResponse(`Examination not found with examinationId: ${req.params.examinationId}`, 404)
      );
    }

    return res.status(200).json({ data: examination });

  } catch(err) {
    return next(err);
  }
}

// @desc      Delete examination
// @route     DELETE /api/v1/examinations/:examinationId
// @access    Private/Physician/Admin
exports.deleteExamination = async (req, res, next) => {
  try {
    const examination = await Examination.findByIdAndDelete(req.params.examinationId);

    if (!examination) {
      return next(
        new ErrorResponse(`Examination not found with examinationId: ${req.params.examinationId}`, 404)
      );
    }

    return res.status(204);

  } catch(err) {
    return next(err);
  }
}
