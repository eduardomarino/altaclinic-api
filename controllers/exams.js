const Exam = require('../models/Exam');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all exams
// @route     GET /api/v1/exams
// @access    Private/Physician/Admin
exports.getAllExams = async (req, res, next) => {
  try {
    // Get all patient exams
    if (req.query.patientId) {
      let query;

      query = Exam.find({ patient: req.query.patientId }).populate({
        path: 'patient physician',
        select: 'firstName lastName age telephone email healthInsurance'
      });

      const exam = await query;

      if (exam.length === 0) {
        return next(
          new ErrorResponse(`Exam not found with patientId: ${req.query.patientId}`, 404)
        );
      }

      return res.status(200).json({
        success: true,
        data: exam
      });
    }

    // Get all exams
    return res.status(200).json(res.resultsHandler);

  } catch(err) {
    return next(err);
  }
}

// @desc      Get single exam
// @route     GET /api/v1/exams/:examId
// @access    Private/Physician/Admin
exports.getExam = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.examId);

    if (!exam) {
      return next(
        new ErrorResponse(`Exam not found with id: ${req.params.examId}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: exam
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Create new exam
// @route     POST /api/v1/exams
// @access    Private/Physician/Admin
exports.createExam = async (req, res, next) => {
  try {
    const exam = await Exam.create(req.body);
    return res.status(201).json({
      success: true,
      data: exam
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Update exam
// @route     PUT /api/v1/exams/:examId
// @access    Private/Physician/Admin
exports.updateExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.examId, req.body, {
      new: true,
      runValidators: true
    });

    if (!exam) {
      return next(
        new ErrorResponse(`Exam not found with id: ${req.params.examId}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: exam
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Delete exam
// @route     DELETE /api/v1/exams/:examId
// @access    Private/Physician/Admin
exports.deleteExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.examId);

    if (!exam) {
      return next(
        new ErrorResponse(`Exam not found with id: ${req.params.examId}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch(err) {
    return next(err);
  }
}
