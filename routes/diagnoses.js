const express = require('express');
const router = express.Router();
const {
  getAllDiagnoses,
  getDiagnosis,
  createDiagnosis,
  updateDiagnosis,
  deleteDiagnosis
} = require('../controllers/diagnoses');

const Diagnosis = require('../models/Diagnosis');

const resultsHandler = require('../middleware/results');
const { protect, authorize } = require('../middleware/auth');

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
