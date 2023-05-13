const express = require('express');
// const { usersController } = require('../controllers');
const {usersController} = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();


router.get('/', usersController.getAllUsers);
router.post('/signup', usersController.signUp);
router.post('/login', usersController.login);
router.get('/:userId', auth, usersController.getUserById);
router.get('/:userId/todos', usersController.getAllTodosByUserId);
router.put('/:userId', auth, usersController.updateUserById);
router.delete('/:userId', usersController.deleteUserById);

module.exports = router;
