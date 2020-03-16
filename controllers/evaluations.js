const Evaluation = require('../models/Evaluation');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all evaluations of a specific patient
// @route     GET /api/v1/evaluation
exports.getAllEvaluations = (req, res, next) => {
  try {
    if (req.query.patientId) {
      let query;

      query = Evaluation.find({ patient: req.query.patientId }).populate({
        path: 'patient physician',
        select: 'name'
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

    return res.status(200).json(res.resultsHandler);

  } catch(err) {
    return next(err);
  }
}

// @desc      Get single evaluation of a specific patient
// @route     GET /api/v1/evaluation/:evaluationId
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

// @desc      Create new evaluation for a specific patient
// @route     POST /api/v1/evaluation
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

// @desc      Update evaluation of a specific patient
// @route     PUT /api/v1/evaluation/:evaluationId
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

// @desc      Delete evaluation of a specific patient
// @route     DELETE /api/v1/evaluation/:evaluationId
exports.deleteEvaluation = (req, res, next) => {
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
