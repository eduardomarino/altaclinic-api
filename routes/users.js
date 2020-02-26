const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const User = require('../models/User');
const resultsHandler = require('../middleware/results');

router
  .route('/')
  .get(resultsHandler(User), getAllUsers)
  .post(createUser)
;

router
  .route('/:userId')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)
;

module.exports = router;
