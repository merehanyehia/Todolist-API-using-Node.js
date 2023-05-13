const Todo = require('../models/todo');
const User = require('../models/user');

const mongoose = require('mongoose');

  // Create todo
  const createTodo = async (req, res) => {
  try {
  // Creating new todo
  const todo = new Todo({
  userId: req.body.userId,
  title: req.body.title,
  tags: req.body.tags,
  status : req.body.status
  });
  // Saving todo to database
  const savedTodo = await todo.save();

  // Sending response
  res.status(201).json({
    message: 'Todo created',
    todo: savedTodo
  });
} catch (error) {
  // Handling error
  res.status(500).json({
    message: 'Error creating todo',
    error: error.message
  });
}
  }
  // Get all todos by user ID


// Get todo by ID
const getTodoById = async (req, res) => {
  // console.log("hhhhh");
  try {
  // const todoId= mongoose.Types.ObjectId.createFromHexString(req.params._id)
  const todo = await Todo.findById(req.params._id);
  console.log("Found todo:", todo);
  if (!todo) {
    // Todo not found
    console.log("Todo not found");
    res.status(404).json({
      message: 'Todo not found'
    });
  }
  // if (req.params._id !== req.todo.userId) {
  //   console.log("Access denied");
  //   return res.status(403).json({
  //     message: 'Access denied'
  //   });
  // }
  else {
    // Todo found
    return res.json(todo);
  }

} catch (error) {
  // Handling error
  res.status(500).json({
    message: 'Error getting todo',
    error: error.message
  });
}
}
// Update todo by ID
const updateTodoById= async (req, res) => {
  const userId = mongoose.Types.ObjectId.createFromHexString(req.body.userId);
  // console.log(userId);
  try {
  // Updating todo by ID
  const updatedTodo = await Todo.findByIdAndUpdate(
  req.params._id,
  req.body,
  { new: true }
  );
  if (!updatedTodo) {
    // Todo not found
    res.status(404).json({
      message: 'Todo not found'
    });
  }
// else if (updatedTodo.userId !== (req.params._id)) {
//       // User is not authorized to delete this todo
//       return res.status(401).json({
//         message: 'Unauthorized'
//       });
//     }
  else {
    // Todo updated
    res.status(200).json({
      message: 'Todo updated',
      todo: updatedTodo
    });
  }
} catch (error) {
  // Handling error
  res.status(500).json({
    message: 'Error updating todo',
    error: error.message
  });
}
}
const getTodos = async (req, res) => {
  try {
    const { limit = 10, skip = 0, status } = req.query;

    const query = status ? { status } : {};

    const todos = await Todo.find(query)
      .limit(Number(limit))
      .skip(Number(skip));
console.log(todos);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: 'Error getting todos',
      error: error.message
    });
  }
}
const deleteTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params._id);
    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found'
      });
    }
 
    // if ( todo.userId !== req.User._id) {
    //   return res.status(401).json({ message: 'You are not authorized to delete this todo' });
    // }
    const deletedTodo = await Todo.findByIdAndDelete(req.params._id);

    // Todo deleted
    res.status(200).json({
      message: 'Todo deleted',
      todo: deletedTodo
    });
  } catch (error) {
    // Handling error
    res.status(500).json({
      message: 'Error deleting todo',
      error: error.message
    });
  }
}


  
module.exports = {
  createTodo,
  getTodoById,
  deleteTodoById,
  updateTodoById,
  getTodos
};
