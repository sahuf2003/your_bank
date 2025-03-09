import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 
import { BiMoney } from "react-icons/bi"; 

const Accounts = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

        const fetchCustomers = async () => {
            try {
                const response = await fetch("https://enpointe-assignment.onrender.com/api/customers", {
                    method: "GET",
                    headers: { "Authorization": token },
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.message || "Failed to fetch customers");

                setCustomers(data.customers);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCustomers();
    }, [token, navigate]);

    const fetchTransactions = async (customerId) => {
        try {
            setSelectedCustomer(customerId);
            setTransactions([]);
            setError(null);

            const response = await fetch(`https://enpointe-assignment.onrender.com/api/transaction?customer_id=${customerId}`, {
                method: "GET",
                headers: { "Authorization": token },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch transactions");
            setBalance(data.current_balance);
            setTransactions(data.transactions);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("https://enpointe-assignment.onrender.com/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            localStorage.removeItem("token");
            navigate("/");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <div className="flex justify-between items-center w-full max-w-5xl mb-6">
                <h2 className="text-3xl font-bold text-blue-700">Banker Dashboard</h2>
                <button
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                {customers.length === 0 ? (
                    <p className="text-gray-600">No customers found.</p>
                ) : (
                    customers.map((customer) => (
                        <div
                            key={customer.id}
                            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-100"
                            onClick={() => fetchTransactions(customer.id)}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-blue-700 text-white p-3 rounded-full">
                                    <FaUserCircle className="text-3xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{customer.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {selectedCustomer && (
                <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Transaction History</h3>
                    {transactions.length === 0 ? (
                        <p className="text-gray-600">No transactions available.</p>
                    ) : (
                        <ul>
                             <li>Current Balance: ₹{balance}</li>
                            {transactions.map((tx, index) => (
                                <li key={index} className="border-b py-2 text-gray-700">
                                    <span
                                        className={tx.transaction_type === "deposit" ? "text-blue-500 font-bold" : "text-blue-300 font-bold"}
                                    >
                                        <BiMoney className="inline-block mr-1" />
                                        {tx.transaction_type.toUpperCase()}
                                    </span>{" "}
                                    - ₹{tx.amount} ({new Date(tx.time).toLocaleString()})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Accounts;
