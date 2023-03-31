import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// @desc    Authenticate user & get token
// @route   POST api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // console.log(email, password);
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        // res.status(401).json({message: 'Invalid Email or Password'});
        return res.status(500).send({err:'Invalid email or pasoowrd'});
        // throw new Error('Invalid Email or Password');
    }
});

// @desc    Get user profile
// @route   GET api/users/profile
// @access  private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else {
        return res.status(401).send({
            err: "User not found",
        });
    }
});

// @desc    Register a new user
// @route   POST api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(409).send({
            err: "User already registered",
        });
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        return res.status(400).send({
            err: "Invalid user data",
        });
    }
});

export { authUser, getUserProfile, registerUser }
