const Appointment = require('../models/Appointment');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all appointments
// @route     GET /api/v1/appointments
// @access    Private
exports.getAllAppointments = async (req, res, next) => {
  try {
    // Get all patient appointments
    if (req.query.patientId) {
      let query;

      query = Appointment.find({ patient: req.query.patientId }).populate({
        path: 'patient physician',
        select: 'firstName lastName age telephone email healthInsurance'
      });

      const appointment = await query;

      if (appointment.length === 0) {
        return next(
          new ErrorResponse(`Appointment not found with patientId: ${req.query.patientId}`, 404)
        );
      }

      return res.status(200).json({ data: appointment });
    }

    // Get all appointments
    return res.status(200).json(res.resultsHandler);

  } catch(err) {
    return next(err);
  }
}

// @desc      Get single appointment
// @route     GET /api/v1/appointments/:appointmentId
// @access    Private
exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId);

    if (!appointment) {
      return next(
        new ErrorResponse(`Appointment not found with appointmentId: ${req.params.appointmentId}`, 404)
      );
    }

    return res.status(200).json({ data: appointment });

  } catch(err) {
    return next(err);
  }
}

// @desc      Create new appointment
// @route     POST /api/v1/appointments
// @access    Private
exports.createAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.create(req.body);
    return res.status(201).json({ data: appointment });

  } catch(err) {
    return next(err);
  }
}

// @desc      Update appointment
// @route     PUT /api/v1/appointments/:appointmentId
// @access    Private
exports.updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, req.body, {
      new: true,
      runValidators: true
    });

    if (!appointment) {
      return next(
        new ErrorResponse(`Appointment not found with appointmentId: ${req.params.appointmentId}`, 404)
      );
    }

    return res.status(200).json({ data: appointment });

  } catch(err) {
    return next(err);
  }
}

// @desc      Delete appointment
// @route     DELETE /api/v1/appointments/:appointmentId
// @access    Private
exports.deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.appointmentId);

    if (!appointment) {
      return next(
        new ErrorResponse(`Appointment not found with appointmentId: ${req.params.appointmentId}`, 404)
      );
    }

    return res.status(204);

  } catch(err) {
    return next(err);
  }
}
