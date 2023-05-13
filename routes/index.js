const express = require('express');

const todosRoutes = require('./todos');
const usersRoutes = require('./users');

const router = express.Router();
router.use('/todos', todosRoutes);
router.use('/users', usersRoutes);

module.exports = router;
