const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Todo = require('../models/todo');

const {JWT_SECRET = 'logged'} = process.env; 

var token;

  const signUp = async (req, res) => {
  try {
  const user = new User({
  username:req.body.username,
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  password : req.body.password,
  dob: req.body.dob
  });
  const savedUser = await user.save();
// const token = jwt.sign(
//   { userId: savedUser._id },
//   JWT_SECRET,
//   { expiresIn: '1h' }
// );
  res.status(201).json({
    message: 'User created',
    user: savedUser,
    // token: token
  });
} catch (error) {
  res.status(500).json({
    message: 'Error creating user',
    error: error.message
  });
}
  }

const login = async (req, res) => {
  try {
  const user = await User.findOne({
  username: req.body.username,
  password: req.body.password
  });
  if (!user) {
    res.status(401).json({
      message: 'Invalid username or password'
    });
  } else {
     token = jwt.sign({ id: user._id}, JWT_SECRET);

    return res.status(200).json({
      message: 'User logged in',
      user: {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob
      },
      token: token
    });
  }
} catch (error) {
  // Handling error
  res.status(500).json({
    message: 'Error logging in',
    error: error.message
  });
}
}

const getUserById = async (req, res) => {
  console.log("hhhhhh");
  try {
  const user = await User.findById(req.params.userId);
  console.log(user);
  if (!user) {
    res.status(404).json({
      message: 'User not found'
    });
  } 
   // Check if user is trying to access their own data
   if (req.user._id.toString() !== req.params.userId) {
    return res.status(403).json({
      message: 'Access denied'
    });
  }
  else {
    return res.json(user);
    }
} catch (error) {
  res.status(500).json({
    message: 'Error getting user',
    error: error.message
  });
}
}

const updateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
  // Check if user is trying to update their own data
  if (req.user._id.toString() !== req.params.userId) {
    return res.status(403).json({
      message: 'Access denied'
    });
  }
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = req.body.password;
    user.username = req.body.username;
    user.dob = req.body.dob;

    const updatedUser = await user.save();

    return res.status(200).json({
      message: 'User was updated successfully',
      user: updatedUser
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        error: error.message
      });
    }

    res.status(500).json({
      message: 'Error updating user',
      error: error.message
    });
  }
}
const deleteUserById = async (req, res) => {
  try {
  const deletedUser = await User.findByIdAndDelete(req.params.userId);
  if (!deletedUser) {
    res.status(404).json({
      message: 'User not found'
    });
  }
  // if (req.deletedUser._id.toString() !== req.params.userId) {
  //   return res.status(403).json({
  //     message: 'Access denied'
  //   });
  // }
  
  else {
    res.status(200).json({
      message: 'User deleted',
      user: deletedUser
    });
  }
} catch (error) {
  // Handling error
  res.status(500).json({
    message: 'Error deleting user',
    error: error.message
  });
}
}

const getAllUsers= async (req, res) => {
  try {
    // Finding all users
    const users = await User.find();
    const firstNames = users.map(user => user.firstName);

    // Sending response
    return res.status(200).json({
      message: 'First names of all registered users',
      // firstNames: firstNames
      users:users,
    });
  } catch (error) {
    // Handling error
    res.status(500).json({
      message: 'Error getting users',
      error: error.message
    });
  }
}

// const getAllTodosByUserId = async (req, res) => {
//   try {
//   // Finding todos by user ID
//   const todos = await Todo.find({ userId: req.params.userId });
//   // Sending response
//   return res.status(200).json(todos);
// } catch (error) {
//   // Handling error
//   res.status(500).json({
//     message: 'Error getting todos',
//     error: error.message
//   });
// }
// }

const getAllTodosByUserId = async (req, res) => {
  try {
    // Finding todos by user ID
    const todos = await Todo.find({ userId: req.params.userId });
    // Sending response
    return res.status(200).json(todos);
  } catch (error) {
    // Handling error
    return res.status(500).json({
      message: 'Error getting todos',
      error: error.message
    });
  }
}


module.exports = {
  signUp,
  login,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllUsers,
  getAllTodosByUserId
};
