const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('./userValidation'); // Import validation schemas

const secretKey = "secret123"; 

const registerUser = (req, res) => {
    const { error } = registerSchema.validate(req.body); // Validate registration input

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password, email } = req.body;
    const existingUser = UserModel.findUserByUsername(username);

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = { id: Date.now(), username, password, email };
    UserModel.createUser(newUser); // ID is automatically added here

    res.status(201).json({ message: "User registered successfully" });
};

const loginUser = (req, res) => {
    const { error } = loginSchema.validate(req.body); // Validate login input

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password } = req.body;
    const user = UserModel.findUserByUsername(username);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ message: "Login successful", token });
};

const getUserProfile = (req, res) => {
    const { username } = req.user;
    const user = UserModel.findUserByUsername(username);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({ id: user.id, username: user.username, email: user.email }); // Include the user's ID in the response
};

module.exports = { registerUser, loginUser, getUserProfile };
