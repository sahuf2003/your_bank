import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const rawResponse = await response.text();
      console.log("🔍 Raw Response:", rawResponse); 

      let data;
      try {
        data = JSON.parse(rawResponse);
      } catch (parseError) {
        console.error("❌ JSON Parsing Error:", parseError);
        throw new Error("Invalid JSON response from server");
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const token = data.accessToken; 
      const customerId = data.customer_id; 

      if (!token) {
        throw new Error("No access token received from server");
      }

    
      localStorage.setItem("token", token);
      if (customerId) localStorage.setItem("customer_id", customerId);

      console.log("✅ Stored Token:", localStorage.getItem("token"));
      if (customerId) console.log("✅ Stored Customer ID:", localStorage.getItem("customer_id"));

      navigate("/transaction"); 
    } catch (err) {
      console.error("❌ Login Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden md:block w-1/2 bg-blue-200">
        <img
          src="img2.jpg" 
          alt="Login Illustration"
          className="w-full h-full object-fill"
        />
      </div>

      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center bg-white shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Customer Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg mb-6 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
          <br/>
          for testing <br />
          email:user@gmail.com <br />
          password:password

        </p>
      </div>
    </div>
  );
};

export default Login;
