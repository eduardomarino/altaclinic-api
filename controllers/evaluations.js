const Evaluation = require('../models/Evaluation');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all evaluations
// @route     GET /api/v1/evaluations
// @access    Private/Physician/Admin
exports.getAllEvaluations = async (req, res, next) => {
  try {
    // Get all patient evaluations
    if (req.query.patientId) {
      let query;

      query = Evaluation.find({ patient: req.query.patientId }).populate({
        path: 'patient physician',
        select: 'firstName lastName age telephone email healthInsurance'
      });

      const evaluation = await query;

      if (evaluation.length === 0) {
        return next(
          new ErrorResponse(`Evaluation not found with patientId: ${req.query.patientId}`, 404)
        );
      }

      return res.status(200).json({
        success: true,
        data: evaluation
      });
    }

    // Get all evaluations
    return res.status(200).json(res.resultsHandler);

  } catch(err) {
    return next(err);
  }
}

// @desc      Get single evaluation
// @route     GET /api/v1/evaluations/:evaluationId
// @access    Private/Physician/Admin
exports.getEvaluation = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findById(req.params.evaluationId);

    if (!evaluation) {
      return next(
        new ErrorResponse(`Evaluation not found with id: ${req.params.evaluationId}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: evaluation
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Create new evaluation
// @route     POST /api/v1/evaluations
// @access    Private/Physician/Admin
exports.createEvaluation = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.create(req.body);
    return res.status(201).json({
      success: true,
      data: evaluation
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Update evaluation
// @route     PUT /api/v1/evaluations/:evaluationId
// @access    Private/Physician/Admin
exports.updateEvaluation = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findByIdAndUpdate(req.params.evaluationId, req.body, {
      new: true,
      runValidators: true
    });

    if (!evaluation) {
      return next(
        new ErrorResponse(`Evaluation not found with id: ${req.params.evaluationId}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: evaluation
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Delete evaluation
// @route     DELETE /api/v1/evaluations/:evaluationId
// @access    Private/Physician/Admin
exports.deleteEvaluation = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findByIdAndDelete(req.params.evaluationId);

    if (!evaluation) {
      return next(
        new ErrorResponse(`Patient not found with id: ${req.params.evaluationId}`, 404)
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
