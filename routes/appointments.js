const express = require('express');
const router = express.Router();
const {
  getAllAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointments');

const Appointment = require('../models/Appointment');

const resultsHandler = require('../middleware/results');
const { protect, authorize } = require('../middleware/auth');

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
