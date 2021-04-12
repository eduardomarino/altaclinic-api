const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authorization');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('../services/authService');

router.post('/register', protect, authorize('admin'), register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;
