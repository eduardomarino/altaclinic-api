const Patient = require('../models/Patient');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all patients
// @route     GET /api/v1/patients
exports.getAllPatients = (req, res, next) => {
  try {
    return res.status(200).json(res.resultsHandler);

  } catch(err) {
    return next(err);
  }
}

// @desc      Get single patient
// @route     GET /api/v1/patients/:patientId
exports.getPatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.patientId);

    if (!patient) {
      return next(
        new ErrorResponse(`Patient not found with id: ${req.params.patientId}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: patient
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Create new patient
// @route     POST /api/v1/patients
exports.createPatient = async (req, res, next) => {
  try {
    const patient = await Patient.create(req.body);
    return res.status(201).json({
      success: true,
      data: patient
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Update patient
// @route     PUT /api/v1/patients/:patientId
exports.updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.patientId, req.body, {
      new: true,
      runValidators: true
    });

    if (!patient) {
      return next(
        new ErrorResponse(`Patient not found with id: ${req.params.patientId}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: patient
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Delete patient
// @route     DELETE /api/v1/patients/:patientId
exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.patientId);

    if (!patient) {
      return next(
        new ErrorResponse(`Patient not found with id: ${req.params.patientId}`, 404)
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

// @desc      Get all prescriptions of a specific patient
// @route     GET /api/v1/patients/:patientId/prescription
exports.getAllPrescriptions = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show all prescriptions of patient ${req.params.patientId}`
  });
}

// @desc      Get single prescription of a specific patient
// @route     GET /api/v1/patients/:patientId/prescription/:prescriptionId
exports.getPrescription = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Get prescription ${req.params.prescriptionId} of patient ${req.params.patientId}`
  });
}

// @desc      Create new prescription for a specific patient
// @route     POST /api/v1/patients/:patientId/prescription
exports.createPrescription = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Create new prescription for patient ${req.params.patientId}`
  });
}

// @desc      Update prescription of a specific patient
// @route     PUT /api/v1/patients/:patientId/prescription/:prescriptionId
exports.updatePrescription = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update prescription ${req.params.prescriptionId} of patient ${req.params.patientId}`
  });
}

// @desc      Delete prescription of a specific patient
// @route     DELETE /api/v1/patients/:patientId/prescription/:prescriptionId
exports.deletePrescription = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete prescription ${req.params.prescriptionId} of patient ${req.params.patientId}`
  });
}

// @desc      Get all evaluations of a specific patient
// @route     GET /api/v1/patients/:patientId/evaluation
exports.getAllEvaluations = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show all evaluations of patient ${req.params.patientId}`
  });
}

// @desc      Get single evaluation of a specific patient
// @route     GET /api/v1/patients/:patientId/evaluation/:evaluationId
exports.getEvaluation = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Get evaluation ${req.params.evaluationId} of patient ${req.params.patientId}`
  });
}

// @desc      Create new evaluation for a specific patient
// @route     POST /api/v1/patients/:patientId/evaluation
exports.createEvaluation = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Create new evaluation for patient ${req.params.patientId}`
  });
}

// @desc      Update evaluation of a specific patient
// @route     PUT /api/v1/patients/:patientId/evaluation/:evaluationId
exports.updateEvaluation = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update evaluation ${req.params.evaluationId} of patient ${req.params.patientId}`
  });
}

// @desc      Delete evaluation of a specific patient
// @route     DELETE /api/v1/patients/:patientId/evaluation/:evaluationId
exports.deleteEvaluation = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete evaluation ${req.params.evaluationId} of patient ${req.params.patientId}`
  });
}

// @desc      Get all exam of a specific patient
// @route     GET /api/v1/patients/:patientId/exam
exports.getAllExam = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show all exam of patient ${req.params.patientId}`
  });
}

// @desc      Get single exam of a specific patient
// @route     GET /api/v1/patients/:patientId/exam/:examId
exports.getExam = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Get exam ${req.params.examId} of patient ${req.params.patientId}`
  });
}

// @desc      Create new exam for a specific patient
// @route     POST /api/v1/patients/:patientId/exam
exports.createExam = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Create new exam for patient ${req.params.patientId}`
  });
}

// @desc      Update exam of a specific patient
// @route     PUT /api/v1/patients/:patientId/exam/:examId
exports.updateExam = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update exam ${req.params.examId} of patient ${req.params.patientId}`
  });
}

// @desc      Delete exam of a specific patient
// @route     DELETE /api/v1/patients/:patientId/exam/:examId
exports.deleteExam = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete exam ${req.params.examId} of patient ${req.params.patientId}`
  });
}

// @desc      Get all medical record of a specific patient
// @route     GET /api/v1/patients/:patientId/medical-record
exports.getAllMedicalRecord = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show all medical record of patient ${req.params.patientId}`
  });
}

// @desc      Get single medical record of a specific patient
// @route     GET /api/v1/patients/:patientId/medical-record/:medicalRecordId
exports.getMedicalRecord = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Get medical record ${req.params.medicalRecordId} of patient ${req.params.patientId}`
  });
}

// @desc      Create new medical record for a specific patient
// @route     POST /api/v1/patients/:patientId/medical-record
exports.createMedicalRecord = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Create new medical record for patient ${req.params.patientId}`
  });
}

// @desc      Update medical record of a specific patient
// @route     PUT /api/v1/patients/:patientId/medical-record/:medicalRecordId
exports.updateMedicalRecord = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update medical record ${req.params.medicalRecordId} of patient ${req.params.patientId}`
  });
}

// @desc      Delete medical record of a specific patient
// @route     DELETE /api/v1/patients/:patientId/medical-record/:medicalRecordId
exports.deleteMedicalRecord = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete medical record ${req.params.medicalRecordId} of patient ${req.params.patientId}`
  });
}

// @desc      Get all appointment history of a specific patient
// @route     GET /api/v1/patients/:patientId/appointment-history
exports.getAllAppointmentHistory = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show all appointment history of patient ${req.params.patientId}`
  });
}

// @desc      Get single appointment history of a specific patient
// @route     GET /api/v1/patients/:patientId/appointment-history/:appointmentHistoryId
exports.getAppointmentHistory = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Get appointment history ${req.params.appointmentHistoryId} of patient ${req.params.patientId}`
  });
}

// @desc      Create new appointment history for a specific patient
// @route     POST /api/v1/patients/:patientId/appointment-history
exports.createAppointmentHistory = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Create new appointment history for patient ${req.params.patientId}`
  });
}

// @desc      Update appointment history of a specific patient
// @route     PUT /api/v1/patients/:patientId/appointment-history/:appointmentHistoryId
exports.updateAppointmentHistory = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update appointment history ${req.params.appointmentHistoryId} of patient ${req.params.patientId}`
  });
}

// @desc      Delete appointment history of a specific patient
// @route     DELETE /api/v1/patients/:patientId/appointment-history/:appointmentHistoryId
exports.deleteAppointmentHistory = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete appointment history ${req.params.appointmentHistoryId} of patient ${req.params.patientId}`
  });
}
