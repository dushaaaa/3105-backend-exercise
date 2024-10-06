const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const secretKey = "secret123"; 

const registerUser = (req, res) => {
    const { username, password, email } = req.body;
    const existingUser = UserModel.findUserByUsername(username);

    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = { id: Date.now(), username, password, email };
    UserModel.createUser(newUser);
    res.status(201).json({ message: "User registered successfully" });
};

const loginUser = (req, res) => {
    const { username, password } = req.body;
    const user = UserModel.findUserByUsername(username);

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

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

    res.json({ username: user.username, email: user.email }); // Respond with the user's profile data (username and email)
};

module.exports = { registerUser, loginUser, getUserProfile };
