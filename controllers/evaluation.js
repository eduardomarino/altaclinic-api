// @desc      Get all evaluations
// @route     GET /api/v1/evaluation
exports.getEvaluations = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all evaluations' });
}

// @desc      Get single evaluation
// @route     GET /api/v1/evaluation/:id
exports.getEvaluation = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get evaluation ${req.params.id}` });
}

// @desc      Create new evaluation
// @route     POST /api/v1/evaluation
exports.createEvaluation = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new evaluation' });
}

// @desc      Update evaluation
// @route     PUT /api/v1/evaluation/:id
exports.updateEvaluation = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update evaluation ${req.params.id}` });
}

// @desc      Delete evaluation
// @route     DELETE /api/v1/evaluation/:id
exports.deleteEvaluation = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete evaluation ${req.params.id}` });
}
