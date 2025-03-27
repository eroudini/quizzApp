import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/forgot.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/auth/forgot-password", {
        email,
      });

      setLoading(false);
      setMessage({ text: response.data, type: "success" });
    } catch (error) {
      setLoading(false);
      setMessage({ text: "Error sending reset link.", type: "error" });
      console.error("Forgot password error", error);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Forgot Password</h2>

        {loading && <p className="info-message">Please wait...</p>}
        {message && (
          <p className={`info-message ${message.type}`}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="login-button" disabled={loading}>
            Send
          </button>
        </form>

        <p className="forgot-link">
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
