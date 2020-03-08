const Appointment = require('../models/Appointment');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all appointments
// @route     GET /api/v1/appointments
exports.getAllAppointments = (req, res, next) => {
  try {
    return res.status(200).json(res.resultsHandler);

  } catch(err) {
    return next(err);
  }
}

// @desc      Get single appointment
// @route     GET /api/v1/appointments/:appointmentId
exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId);

    if (!appointment) {
      return next(
        new ErrorResponse(`Appointment not found with id: ${req.params.appointmentId}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: appointment
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Create new appointment
// @route     POST /api/v1/appointments
exports.createAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.create(req.body);
    return res.status(201).json({
      success: true,
      data: appointment
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Update appointment
// @route     PUT /api/v1/appointments/:appointmentId
exports.updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, req.body, {
      new: true,
      runValidators: true
    });

    if (!appointment) {
      return next(
        new ErrorResponse(`Appointment not found with id: ${req.params.appointmentId}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: appointment
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Delete appointment
// @route     DELETE /api/v1/appointments/:appointmentId
exports.deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.appointmentId);

    if (!appointment) {
      return next(
        new ErrorResponse(`Appointment not found with id: ${req.params.appointmentId}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch(err) {
    return next(err);
  }
}
