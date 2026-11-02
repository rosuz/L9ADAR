const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');

const router = express.Router();

router.post('/', createUser);

router.get('/', getUsers);

router.get('/', getUserById);

router.patch('/', updateUser);

router.delete('/', deleteUser);

module.exports = router;