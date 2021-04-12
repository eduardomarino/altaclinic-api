const express = require('express');
const router = express.Router();
const {
  getAllExaminations,
  getExamination,
  createExamination,
  updateExamination,
  deleteExamination
} = require('../services/examinationsService');

const Examination = require('../models/examinationModel');

const resultsHandler = require('../middleware/results');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin', 'physician'));

router
  .route('/')
  .get(resultsHandler(Examination), getAllExaminations)
  .post(createExamination)
;

router
  .route('/:examinationId')
  .get(getExamination)
  .put(updateExamination)
  .delete(deleteExamination)
;

module.exports = router;
