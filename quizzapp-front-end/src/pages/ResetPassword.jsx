import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/reset.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setMessage({ text: "Invalid or missing token.", type: "error" });
    }
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/reset-password", {
        token,
        newPassword,
      });

      setMessage({ text: response.data, type: "success" });
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage({ text: "Error resetting password.", type: "error" });
      console.error("Reset password error:", error);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2>Reset Password</h2>
        {message && (
          <p className={`info-message ${message.type}`}>
            {message.text}
          </p>
        )}
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="reset-button">Submit</button>
        </form>
        <p>
          <button className="back-button" onClick={() => navigate("/login")}>Back to Login</button>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
