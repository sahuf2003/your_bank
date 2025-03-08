const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');

exports.createTransaction = (req, res) => {
    const accessToken = req.headers.authorization;
    const { transaction_type, amount } = req.body;

    if (!accessToken || !transaction_type || amount <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    User.findByToken(accessToken, (err, userResults) => {
        if (userResults.length === 0) return res.status(401).json({ error: 'Invalid access token' });

        const { id: userId, name } = userResults[0];

        Transaction.getLatestBalance(userId, (err, balanceResults) => {
            let currentBalance = balanceResults.length > 0 ? parseFloat(balanceResults[0].balance) : 0;
            let newBalance = transaction_type === 'deposit' ? currentBalance + parseFloat(amount) : currentBalance - amount;

            if (transaction_type === 'withdraw' && amount > currentBalance) {
                return res.status(400).json({ error: 'Insufficient balance' });
            }

            Transaction.createTransaction(userId, name, transaction_type, amount, newBalance, () => {
                res.json({ message: `${transaction_type} successful`, balance: newBalance });
            });
        });
    });
};

exports.getTransactions = (req, res) => {
    const { customer_id } = req.query;
    Transaction.getTransactionsByCustomerId(customer_id, (err, transactions) => {
        res.json({ transactions, current_balance: transactions[0]?.balance || 0 });
    });
};
