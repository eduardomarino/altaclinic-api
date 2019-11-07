const express = require('express');
const router = express.Router();
const {
  getAllAppointmentHistory,
  getAppointmentHistory,
  createAppointmentHistory,
  updateAppointmentHistory,
  deleteAppointmentHistory
} = require('../controllers/appointment-history');

router
  .route('/')
  .get(getAllAppointmentHistory)
  .post(createAppointmentHistory)
;

router
  .route('/:id')
  .get(getAppointmentHistory)
  .put(updateAppointmentHistory)
  .delete(deleteAppointmentHistory)
;

module.exports = router;
