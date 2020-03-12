const Exam = require('../models/Exam');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all exams of a specific patient
// @route     GET /api/v1/exam
exports.getAllExams = (req, res, next) => {
  try {
    return res.status(200).json(res.resultsHandler);

  } catch(err) {
    return next(err);
  }
}

// @desc      Get single exam of a specific patient
// @route     GET /api/v1/exam/:examId
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

// @desc      Create new exam for a specific patient
// @route     POST /api/v1/exam
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

// @desc      Update exam of a specific patient
// @route     PUT /api/v1/exam/:examId
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

// @desc      Delete exam of a specific patient
// @route     DELETE /api/v1/exam/:examId
exports.deleteExam = (req, res, next) => {
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
