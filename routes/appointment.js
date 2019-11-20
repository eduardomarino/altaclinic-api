const express = require('express');
const router = express.Router();
const {
  getAllAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointment');

router
  .route('/')
  .get(getAllAppointments)
  .post(createAppointment)
;

router
  .route('/:appointmentId')
  .get(getAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment)
;

module.exports = router;
