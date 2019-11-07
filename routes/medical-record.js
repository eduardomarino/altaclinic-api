const express = require('express');
const router = express.Router();
const {
  getAllMedicalRecord,
  getMedicalRecord,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord
} = require('../controllers/medical-record');

router
  .route('/')
  .get(getAllMedicalRecord)
  .post(createMedicalRecord)
;

router
  .route('/:id')
  .get(getMedicalRecord)
  .put(updateMedicalRecord)
  .delete(deleteMedicalRecord)
;

module.exports = router;
