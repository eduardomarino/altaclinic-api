// @desc      Get all exam requests
// @route     GET /api/v1/exam-request
exports.getExamRequests = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all exam requests' });
}

// @desc      Get single exam request
// @route     GET /api/v1/exam-request/:id
exports.getExamRequest = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get exam request ${req.params.id}` });
}

// @desc      Create new exam request
// @route     POST /api/v1/exam-request
exports.createExamRequest = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new exam request' });
}

// @desc      Update exam request
// @route     PUT /api/v1/exam-request/:id
exports.updateExamRequest = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update exam request ${req.params.id}` });
}

// @desc      Delete exam request
// @route     DELETE /api/v1/exam-request/:id
exports.deleteExamRequest = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete exam request ${req.params.id}` });
}
