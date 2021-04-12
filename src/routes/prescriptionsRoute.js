const express = require('express');
const router = express.Router();
const {
  getAllPrescriptions,
  getPrescription,
  createPrescription,
  updatePrescription,
  deletePrescription
} = require('../services/prescriptionsService');

const Prescription = require('../models/prescriptionModel');

const resultsHandler = require('../middleware/results');
const { protect, authorize } = require('../middleware/authorization');

router.use(protect);
router.use(authorize('admin', 'physician'));

router
  .route('/')
  .get(resultsHandler(Prescription), getAllPrescriptions)
  .post(createPrescription)
;

router
  .route('/:prescriptionId')
  .get(getPrescription)
  .put(updatePrescription)
  .delete(deletePrescription)
;

module.exports = router;
