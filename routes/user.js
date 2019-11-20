const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user');

router
  .route('/')
  .get(getAllUsers)
  .post(createUser)
;

router
  .route('/:userId')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)
;

module.exports = router;
