const express = require('express');
const router = express.Router();
const {
  getAllDiagnoses,
  getDiagnosis,
  createDiagnosis,
  updateDiagnosis,
  deleteDiagnosis
} = require('../controllers/diagnosesController');

const Diagnosis = require('../models/diagnosisModel');

const resultsHandler = require('../middleware/results');
const { protect, authorize } = require('../middleware/authorization');

router.use(protect);
router.use(authorize('admin', 'physician'));

router
  .route('/')
  .get(resultsHandler(Diagnosis), getAllDiagnoses)
  .post(createDiagnosis)
;

router
  .route('/:diagnosisId')
  .get(getDiagnosis)
  .put(updateDiagnosis)
  .delete(deleteDiagnosis)
;

module.exports = router;
