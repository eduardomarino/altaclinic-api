const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../services/usersService');

const User = require('../models/userModel');

const resultsHandler = require('../middleware/results');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .get(resultsHandler(User), getAllUsers)
;

router
  .route('/:userId')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)
;

module.exports = router;
