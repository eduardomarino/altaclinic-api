const express = require('express');
const router = express.Router();
const {
  getEvaluations,
  getEvaluation,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation
} = require('../controllers/evaluation');

router
  .route('/')
  .get(getEvaluations)
  .post(createEvaluation)
;

router
  .route('/:id')
  .get(getEvaluation)
  .put(updateEvaluation)
  .delete(deleteEvaluation)
;

module.exports = router;
