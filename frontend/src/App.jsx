import { Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Transaction from "./pages/Transaction";
import BankLogin from "./pages/BankLogin";
import Accounts from "./pages/Accounts";

function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/banklogin" element={<BankLogin/>} />
      <Route path="/accounts" element={<Accounts/>} />
      <Route path="/transaction" element={<Transaction/>} />
    </Routes>
    
    </>
  )
}

export default App
