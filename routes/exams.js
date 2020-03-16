const express = require('express');
const router = express.Router();
const {
  getAllExams,
  getExam,
  createExam,
  updateExam,
  deleteExam
} = require('../controllers/exams');

const Exam = require('../models/Exam');

const resultsHandler = require('../middleware/results');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin', 'physician'));

router
  .route('/')
  .get(resultsHandler(Exam), getAllExams)
  .post(createExam)
;

router
  .route('/:examId')
  .get(getExam)
  .put(updateExam)
  .delete(deleteExam)
;

module.exports = router;
