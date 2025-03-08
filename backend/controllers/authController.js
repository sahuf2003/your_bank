const crypto = require('crypto');
const User = require('../models/userModel');

const generateAccessToken = () => crypto.randomBytes(18).toString('hex');

exports.register = (req, res) => {
    const { name, email, password, type } = req.body;

    if (!name || !email || !password || !type) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    User.findByEmail(email, (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        User.register(name, email, password, type, (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, results) => {
        if (results.length === 0 || results[0].password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const accessToken = generateAccessToken();
        User.updateAccessToken(results[0].id, accessToken, () => {
            res.json({ message: 'Login successful', accessToken });
        });
    });
};

exports.logout = (req, res) => {
    const { accessToken } = req.body;
    User.clearAccessToken(accessToken, () => {
        res.json({ message: 'Logout successful' });
    });
};
