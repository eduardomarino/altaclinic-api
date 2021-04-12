const express = require('express');
const router = express.Router();
const {
  getAllAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../services/appointmentsService');

const Appointment = require('../models/appointmentModel');

const resultsHandler = require('../middleware/results');
const { protect, authorize } = require('../middleware/authorization');

router.use(protect);
router.use(authorize('admin', 'physician', 'user'));

router
  .route('/')
  .get(resultsHandler(Appointment), getAllAppointments)
  .post(createAppointment)
;

router
  .route('/:appointmentId')
  .get(getAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment)
;

module.exports = router;
