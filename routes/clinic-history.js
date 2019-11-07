const express = require('express');
const router = express.Router();
const {
  getAllClinicHistory,
  getClinicHistory,
  createClinicHistory,
  updateClinicHistory,
  deleteClinicHistory
} = require('../controllers/clinic-history');

router
  .route('/')
  .get(getAllClinicHistory)
  .post(createClinicHistory)
;

router
  .route('/:id')
  .get(getClinicHistory)
  .put(updateClinicHistory)
  .delete(deleteClinicHistory)
;

module.exports = router;
