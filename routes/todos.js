const express = require('express');
const {  auth } = require('../middleware/auth');
const {todosController} = require('../controllers');

const asycnWrapper = require('../lib');

const router = express.Router();

router.get('/:_id',  auth, todosController.getTodoById);
router.post('/', todosController.createTodo);
router.get('/',todosController.getTodos)
router.put('/:_id', todosController.updateTodoById);
router.delete('/:_id', todosController.deleteTodoById);
   
module.exports = router;
