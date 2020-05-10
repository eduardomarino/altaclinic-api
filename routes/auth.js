const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  register,
  updateUser,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('../controllers/auth');

router.post('/register', protect, authorize('admin'), register);
router.put('/updateuser/:userId', protect, updateUser);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;
