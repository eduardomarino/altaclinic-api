const express = require('express');
const router = express.Router();
const {
  getPrescriptions,
  getPrescription,
  createPrescription,
  updatePrescription,
  deletePrescription
} = require('../controllers/prescription');

router
  .route('/')
  .get(getPrescriptions)
  .post(createPrescription)
;

router
  .route('/:id')
  .get(getPrescription)
  .put(updatePrescription)
  .delete(deletePrescription)
;

module.exports = router;
