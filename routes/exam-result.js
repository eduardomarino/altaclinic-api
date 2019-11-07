const express = require('express');
const router = express.Router();
const {
  getExamResults,
  getExamResult,
  createExamResult,
  updateExamResult,
  deleteExamResult
} = require('../controllers/exam-result');

router
  .route('/')
  .get(getExamResults)
  .post(createExamResult)
;

router
  .route('/:id')
  .get(getExamResult)
  .put(updateExamResult)
  .delete(deleteExamResult)
;

module.exports = router;
