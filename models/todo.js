const mongoose=require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30
  },
  status: {
    type: String,
    enum: ['to-do', 'in progress', 'done'],
    default: 'to-do'
  },
  tags: [{
    type: String,
    maxlength: 10,
    optional: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
