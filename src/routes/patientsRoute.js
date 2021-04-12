const express = require('express');
const router = express.Router();
const {
  getAllPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient
} = require('../services/patientsService');

const Patient = require('../models/patientModel');

const resultsHandler = require('../middleware/results');
const { protect, authorize } = require('../middleware/authorization');

router.use(protect);
router.use(authorize('admin', 'physician', 'user'));

router
  .route('/')
  .get(resultsHandler(Patient), getAllPatients)
  .post(createPatient)
;

router
  .route('/:patientId')
  .get(getPatient)
  .put(updatePatient)
  .delete(deletePatient)
;

module.exports = router;
