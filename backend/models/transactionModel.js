const connection = require('../config/db');

const Transaction = {
    getLatestBalance: (customer_id, callback) => {
        connection.query(
            'SELECT balance FROM accounts WHERE customer_id = ? ORDER BY time DESC LIMIT 1',
            [customer_id],
            callback
        );
    },

    createTransaction: (customer_id, name, transaction_type, amount, balance, callback) => {
        connection.query(
            'INSERT INTO accounts (customer_id, name, transaction_type, amount, balance, time) VALUES (?, ?, ?, ?, ?, NOW())',
            [customer_id, name, transaction_type, amount, balance],
            callback
        );
    },

    getTransactionsByCustomerId: (customer_id, callback) => {
        connection.query(
            'SELECT * FROM accounts WHERE customer_id = ? ORDER BY time DESC',
            [customer_id],
            callback
        );
    },

    getCustomersWithTransactions: (callback) => {
        connection.query(
            'SELECT DISTINCT users.id, users.name FROM users JOIN accounts ON users.id = accounts.customer_id',
            callback
        );
    }
};

module.exports = Transaction;
