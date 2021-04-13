const Prescription = require('../models/prescriptionModel');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all prescriptions
// @route     GET /api/v1/prescriptions
// @access    Private/Physician/Admin
exports.getAllPrescriptions = async (req, res, next) => {
  try {
    // Get all patient prescriptions
    if (req.query.patientId) {
      let query;

      query = Prescription.find({ patient: req.query.patientId }).populate({
        path: 'patient physician',
        select: 'firstName lastName age telephone email healthInsurance'
      });

      const prescription = await query;

      if (prescription.length === 0) {
        return next(
          new ErrorResponse(`Prescription not found with patientId: ${req.query.patientId}`, 404)
        );
      }

      return res.status(200).json({ data: prescription });
    }

    // Get all prescriptions
    return res.status(200).json(res.resultsHandler);

  } catch(err) {
    return next(err);
  }
}

// @desc      Get single prescription
// @route     GET /api/v1/prescriptions/:prescriptionId
// @access    Private/Physician/Admin
exports.getPrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findById(req.params.prescriptionId);

    if (!prescription) {
      return next(
        new ErrorResponse(`Prescription not found with prescriptionId: ${req.params.prescriptionId}`, 404)
      );
    }

    return res.status(200).json({ data: prescription });

  } catch(err) {
    return next(err);
  }
}

// @desc      Create new prescription
// @route     POST /api/v1/prescriptions
// @access    Private/Physician/Admin
exports.createPrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.create(req.body);
    return res.status(201).json({ data: prescription });

  } catch(err) {
    return next(err);
  }
}

// @desc      Update prescription
// @route     PUT /api/v1/prescriptions/:prescriptionId
// @access    Private/Physician/Admin
exports.updatePrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(req.params.prescriptionId, req.body, {
      new: true,
      runValidators: true
    });

    if (!prescription) {
      return next(
        new ErrorResponse(`Prescription not found with prescriptionId: ${req.params.prescriptionId}`, 404)
      );
    }

    return res.status(200).json({ data: prescription });

  } catch(err) {
    return next(err);
  }
}

// @desc      Delete prescription
// @route     DELETE /api/v1/prescriptions/:prescriptionId
// @access    Private/Physician/Admin
exports.deletePrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.prescriptionId);

    if (!prescription) {
      return next(
        new ErrorResponse(`Prescription not found with prescriptionId: ${req.params.prescriptionId}`, 404)
      );
    }

    return res.status(204);

  } catch(err) {
    return next(err);
  }
}
