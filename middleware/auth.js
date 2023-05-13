const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { asyncWrapper } = require('../lib');
const User = require('../models/user');
const Todo = require('../models/todo');

const asyncJwtVerify = promisify(jwt.verify);

const { JWT_SECRET = 'logged' } = process.env;

const auth = async (req, res, next) => {
    const { headers: { authorization } } = req;
    const payload = asyncJwtVerify(authorization, JWT_SECRET);
    const [error, data] = await asyncWrapper(payload);
    console.log(data);
    if (error) {
        return next(error);
    }
    const user = await User.findById(data.id);
    if (!user) {
        return next(new Error('User not found'));
    }
    // console.log(user);
    req.user = user;
   
     next();
};
module.exports = {
    auth
};
