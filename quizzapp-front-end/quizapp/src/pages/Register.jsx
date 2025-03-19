import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import "../styles/login.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        email,
        password,
      });
      if (response.data.success) {
        navigate("/login", { state: { successMessage: "Registration successful" } });
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <>
    <Navbar /> 
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <button className="back-button" onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
    </>
  );
};
//ignore
export default Register;