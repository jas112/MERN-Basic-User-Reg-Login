const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Register user
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req, res) => {

    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName || !email || !password){
        res.status(400);
        throw new Error('Please add all fields for user registration.');
    }

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('User already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    if(user){
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user.id)
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data.')
    }

});

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user.id)
        });
    }
    
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getUserNfo = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// @desc    Generates web token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
    register,
    login,
    getUserNfo
};