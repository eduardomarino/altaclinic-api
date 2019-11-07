const express = require('express');
const router = express.Router();
const {
  getExamRequests,
  getExamRequest,
  createExamRequest,
  updateExamRequest,
  deleteExamRequest
} = require('../controllers/exam-request');

router
  .route('/')
  .get(getExamRequests)
  .post(createExamRequest)
;

router
  .route('/:id')
  .get(getExamRequest)
  .put(updateExamRequest)
  .delete(deleteExamRequest)
;

module.exports = router;
