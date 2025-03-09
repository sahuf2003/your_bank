const connection = require('../config/db');

const User = {
    findByEmail: (email, callback) => {
        connection.query('SELECT * FROM users WHERE email = ?', [email], callback);
    },

    findByToken: (accessToken, callback) => {
        connection.query('SELECT * FROM users WHERE access_token = ?', [accessToken], callback);
    },

    register: (name, email, password, type, callback) => {
        connection.query(
            'INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, ?)',
            [name, email, password, type],
            callback
        );
    },

    updateAccessToken: (userId, token, callback) => {
        connection.query('UPDATE users SET access_token = ? WHERE id = ?', [token, userId], callback);
    },

    clearAccessToken: (userId, callback) => {
        connection.query('UPDATE users SET access_token = NULL WHERE id = ?', [userId], callback);
    }    
};

module.exports = User;
