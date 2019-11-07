// @desc      Get all exam results
// @route     GET /api/v1/exam-result
exports.getExamResults = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all exam results' });
}

// @desc      Get single exam result
// @route     GET /api/v1/exam-result/:id
exports.getExamResult = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get exam result ${req.params.id}` });
}

// @desc      Create new exam result
// @route     POST /api/v1/exam-result
exports.createExamResult = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new exam result' });
}

// @desc      Update exam result
// @route     PUT /api/v1/exam-result/:id
exports.updateExamResult = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update exam result ${req.params.id}` });
}

// @desc      Delete exam result
// @route     DELETE /api/v1/exam-result/:id
exports.deleteExamResult = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete exam result ${req.params.id}` });
}
