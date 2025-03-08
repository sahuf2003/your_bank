const Transaction = require('../models/transactionModel');

exports.getCustomers = (req, res) => {
    Transaction.getCustomersWithTransactions((err, results) => {
        res.json({ customers: results });
    });
};
