import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/delete.css";

const ConfirmDeleteAccount = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    const token = localStorage.getItem("token");

    axios
      .delete("http://localhost:8080/auth/delete-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          password: password,
        },
      })
      .then(() => {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("authChange"));
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error deleting account", error);
        setError("Incorrect password");
      });
  };

  return (
    <div className="confirm-delete-container">
      <div className="confirm-delete-box">
        <h2>Confirm Account Deletion</h2>
        <p>To delete your account, please enter your password.</p>

        {error && <div className="error-message">{error}</div>}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button onClick={handleDeleteAccount}>Confirm Deletion</button>
        <button className="back-button" onClick={() => navigate("/")}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmDeleteAccount;
