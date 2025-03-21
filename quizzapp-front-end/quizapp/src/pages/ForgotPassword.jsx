import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/forgot-password", {
        email,
      });
      
      setMessage(response.data);
    } catch (error) {
      setMessage("Error sending reset link.");
      console.error("Forgot password error", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Forgot Password</h2>
        {message && <p className="info-message">{message}</p>}
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Send</button>
        </form>

        <p className="login-link">
          <span onClick={() => navigate("/login")} className="link-text">
            Back to Login
          </span>
        </p>

        <button className="back-button" onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
