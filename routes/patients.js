const express = require('express');
const router = express.Router();
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

const Patient = require('../models/Patient');

const resultsHandler = require('../middleware/results');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin', 'physician', 'user'));

router
  .route('/')
  .get(resultsHandler(Patient), getAllPatients)
  .post(createPatient)
;

router
  .route('/:patientId')
  .get(getPatient)
  .put(updatePatient)
  .delete(authorize('admin'), deletePatient)
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
