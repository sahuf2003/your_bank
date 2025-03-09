import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // 🛠 Fetch transactions from backend
    const fetchTransactions = async () => {
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/transactions", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch");

            setTransactions(data.transactions);
            setBalance(data.balance || 0); // Set balance
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []); // Only runs once when component loads

    // 🏦 Deposit or Withdraw API Call
    const handleTransaction = async (type) => {
        if (!amount || isNaN(amount) || amount <= 0) {
            setError("Enter a valid amount!");
            return;
        }

        setError(null);
        try {
            const response = await fetch("http://localhost:3000/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ transaction_type: type, amount: Number(amount) }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Transaction failed");

            setTransactions([...transactions, data.transaction]); // Add new transaction
            setBalance(data.newBalance); // Update balance
            setAmount(""); // Reset input
        } catch (err) {
            setError(err.message);
        }
    };

    // 🚪 Logout Function
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Transaction History</h2>
            
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* 🔵 Balance Display */}
            <div className="bg-blue-100 p-4 rounded-lg text-center text-lg font-semibold mb-4">
                Current Balance: ₹{balance}
            </div>

            {/* 💰 Deposit & Withdraw Buttons */}
            <div className="flex gap-4 justify-center mb-4">
                <input 
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border p-2 rounded w-1/2"
                />
                <button onClick={() => handleTransaction("deposit")} className="bg-green-600 text-white px-4 py-2 rounded">
                    Deposit
                </button>
                <button onClick={() => handleTransaction("withdraw")} className="bg-red-600 text-white px-4 py-2 rounded">
                    Withdraw
                </button>
            </div>

            {/* 📜 Transaction History */}
            <div className="border p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">History</h3>
                {transactions.length === 0 ? (
                    <p className="text-gray-500">No transactions yet.</p>
                ) : (
                    <ul>
                        {transactions.map((tx, index) => (
                            <li key={index} className="border-b py-2">
                                {tx.transaction_type.toUpperCase()} - ₹{tx.amount} ({new Date(tx.time).toLocaleString()})
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 🚪 Logout */}
            <button onClick={handleLogout} className="mt-4 w-full bg-gray-600 text-white p-2 rounded">
                Logout
            </button>
        </div>
    );
};

export default Transaction;
