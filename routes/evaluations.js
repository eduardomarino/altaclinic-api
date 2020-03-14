const express = require('express');
const router = express.Router();
const {
  getAllEvaluations,
  getEvaluation,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation
} = require('../controllers/evaluations');

const Evaluation = require('../models/Evaluation');

const resultsHandler = require('../middleware/results');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin', 'physician'));

router
  .route('/')
  .get(resultsHandler(Evaluation), getAllEvaluations)
  .post(createEvaluation)
;

router
  .route('/:patientId')
  .get(getEvaluation)
  .put(updateEvaluation)
  .delete(deleteEvaluation)
;

module.exports = router;
