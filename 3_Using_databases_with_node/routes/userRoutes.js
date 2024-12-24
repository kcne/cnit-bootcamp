const express = require('express');
const { getAllUsers, getUsersById, createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// GET /api/users
router.get('/', getAllUsers);
router.get('/:id', getUsersById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
