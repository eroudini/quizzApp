import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        email,
        password,
      });

      if (response.data.success) {
        setSuccessMessage("Registration successful! You can now log in.");
        setErrorMessage("");
        setTimeout(() => {
          navigate("/login", { state: { successMessage: "Registration successful!" } });
        }, 2000);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="register-button">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <button className="back-button" onClick={() => navigate("/")}>Back</button>

      </div>
    </div>
  );
};

export default Register;