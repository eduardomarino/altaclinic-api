const express = require('express');
const router = express.Router();
const {
  getAllPrescriptions,
  getPrescription,
  createPrescription,
  updatePrescription,
  deletePrescription
} = require('../controllers/patients');

const Prescription = require('../models/Prescription');

const resultsHandler = require('../middleware/results');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin', 'physician'));

router
  .route('/')
  .get(resultsHandler(Prescription), getAllPrescriptions)
  .post(createPrescription)
;

router
  .route('/:patientId')
  .get(getPrescription)
  .put(updatePrescription)
  .delete(deletePrescription)
;

module.exports = router;
