const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  getAllPrescriptions,
  getPrescription,
  createPrescription,
  updatePrescription,
  deletePrescription,
  getAllEvaluations,
  getEvaluation,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation,
  getAllExam,
  getExam,
  createExam,
  updateExam,
  deleteExam,
  getAllMedicalRecord,
  getMedicalRecord,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  getAllAppointmentHistory,
  getAppointmentHistory,
  createAppointmentHistory,
  updateAppointmentHistory,
  deleteAppointmentHistory
} = require('../controllers/patients');

router
  .route('/')
  .get(getAllPatients)
  .post(protect, authorize('admin', 'physician', 'user'), createPatient)
;

router
  .route('/:patientId')
  .get(getPatient)
  .put(protect, updatePatient)
  .delete(protect, deletePatient)
;

router
  .route('/:patientId/prescription')
  .get(getAllPrescriptions)
  .post(createPrescription)
;

router
  .route('/:patientId/prescription/:prescriptionId')
  .get(getPrescription)
  .put(updatePrescription)
  .delete(deletePrescription)
;

router
  .route('/:patientId/evaluation')
  .get(getAllEvaluations)
  .post(createEvaluation)
;

router
  .route('/:patientId/evaluation/:evaluationId')
  .get(getEvaluation)
  .put(updateEvaluation)
  .delete(deleteEvaluation)
;

router
  .route('/:patientId/exam')
  .get(getAllExam)
  .post(createExam)
;

router
  .route('/:patientId/exam/:examId')
  .get(getExam)
  .put(updateExam)
  .delete(deleteExam)
;

router
  .route('/:patientId/medical-record')
  .get(getAllMedicalRecord)
  .post(createMedicalRecord)
;

router
  .route('/:patientId/medical-record/:medicalRecordId')
  .get(getMedicalRecord)
  .put(updateMedicalRecord)
  .delete(deleteMedicalRecord)
;

router
  .route('/:patientId/appointment-history')
  .get(getAllAppointmentHistory)
  .post(createAppointmentHistory)
;

router
  .route('/:patientId/appointment-history/:appointmentHistoryId')
  .get(getAppointmentHistory)
  .put(updateAppointmentHistory)
  .delete(deleteAppointmentHistory)
;

module.exports = router;
