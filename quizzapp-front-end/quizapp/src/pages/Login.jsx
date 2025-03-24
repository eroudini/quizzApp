import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/categories");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {location.state?.successMessage && (
          <p className="success-message">{location.state.successMessage}</p>
        )}

        <form onSubmit={handleLogin}>
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

          <p className="forgot-password">
            <span onClick={() => navigate("/forgot-password")} className="link-text">
              Forgot password?
            </span>
          </p>

          <button type="submit" className="login-button">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <button className="back-button" onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
  );
};

export default Login;
