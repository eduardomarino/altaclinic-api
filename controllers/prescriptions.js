const Prescription = require('../models/Prescription');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all prescriptions of a specific patient
// @route     GET /api/v1/prescription
exports.getAllPrescriptions = (req, res, next) => {
  try {
    return res.status(200).json(res.resultsHandler);

  } catch(err) {
    return next(err);
  }
}

// @desc      Get single prescription of a specific patient
// @route     GET /api/v1/prescription/:prescriptionId
exports.getPrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findById(req.params.prescriptionId);

    if (!prescription) {
      return next(
        new ErrorResponse(`Prescription not found with id: ${req.params.prescriptionId}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: prescription
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Create new prescription for a specific patient
// @route     POST /api/v1/prescription
exports.createPrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.create(req.body);
    return res.status(201).json({
      success: true,
      data: prescription
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Update prescription of a specific patient
// @route     PUT /api/v1/prescription/:prescriptionId
exports.updatePrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(req.params.prescriptionId, req.body, {
      new: true,
      runValidators: true
    });

    if (!prescription) {
      return next(
        new ErrorResponse(`Prescription not found with id: ${req.params.prescriptionId}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: prescription
    });

  } catch(err) {
    return next(err);
  }
}

// @desc      Delete prescription of a specific patient
// @route     DELETE /api/v1/prescription/:prescriptionId
exports.deletePrescription = (req, res, next) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.prescriptionId);

    if (!prescription) {
      return next(
        new ErrorResponse(`Prescription not found with id: ${req.params.prescriptionId}`, 404)
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