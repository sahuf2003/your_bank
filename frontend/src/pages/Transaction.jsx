import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md"; 
import { BiMoney } from "react-icons/bi"; 

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const customer_id = localStorage.getItem("customer_id");

  useEffect(() => {
    if (!token || !customer_id) {
      navigate("/login");
    }
  }, [token, customer_id, navigate]);

  // Fetch transactions & balance
  const fetchTransactions = useCallback(async () => {
    if (!token || !customer_id) return;

    try {
      const response = await fetch(`https://enpointe-assignment.onrender.com/api/transaction?customer_id=${customer_id}`, {
        method: "GET",
        headers: { "Authorization": token },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch transactions");

      setTransactions(data.transactions || []);
      setBalance(data.current_balance || 0);
    } catch (err) {
      setError(err.message);
    }
  }, [token, customer_id]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  
  const handleTransaction = async (type) => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Enter a valid amount");
      return;
    }

    if (type === "withdraw" && parseFloat(amount) > balance) {
      alert("You do not have enough balance to complete this transaction.");
      return;
    }

    try {
      const response = await fetch("https://enpointe-assignment.onrender.com/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({ customer_id, transaction_type: type, amount }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Transaction failed");

      setAmount("");
      setError(null);
      fetchTransactions(); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("https://enpointe-assignment.onrender.com/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: customer_id }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Logout failed");

      localStorage.removeItem("token");
      localStorage.removeItem("customer_id");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">Welcome Customer</h2>
        <div className="flex items-center gap-4">
          <div className="bg-blue-700 text-white p-3 rounded-full">
            <FaUserCircle className="text-3xl" />
          </div>
          <button
            className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            onClick={handleLogout}
          >
            <MdExitToApp className="text-xl" />
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-200 text-red-800 p-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
        <div>
          <div className="bg-blue-200 p-4 rounded-lg text-center text-lg font-semibold mb-6">
            <p>Current Balance: ₹{balance}</p>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg overflow-y-auto max-h-80">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Transaction History</h3>
            {transactions.length === 0 ? (
              <p className="text-gray-500">No history before.</p>
            ) : (
              <ul>
                {transactions.map((tx, index) => (
                  <li key={index} className="border-b py-2">
                    <span
                      className={
                        tx.transaction_type === "deposit"
                          ? "text-blue-500 font-bold"
                          : "text-blue-300 font-bold"
                      }
                    >
                      <BiMoney className="inline-block mr-1" />
                      {tx.transaction_type.toUpperCase()}
                    </span>{" "}
                    - ₹{tx.amount} ({new Date(tx.time).toLocaleString()})
                    <br />
                    <span className="text-gray-600">Balance after this: ₹{tx.balance}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Make a Transaction</h3>
          <div className="flex flex-col gap-4 mb-4">
            <input
              type="number"
              placeholder="Enter amount"
              className="border p-2 w-full rounded text-gray-700"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 mb-2 flex items-center justify-center gap-2"
              onClick={() => handleTransaction("deposit")}
            >
              <BiMoney className="text-xl" />
              Deposit
            </button>
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 flex items-center justify-center gap-2"
              onClick={() => handleTransaction("withdraw")}
            >
              <BiMoney className="text-xl" />
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
