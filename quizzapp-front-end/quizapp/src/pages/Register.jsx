import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

      console.log(response.data); // Vérification de la réponse de l'API

      if (response.data.success) {
        navigate("/login", { state: { successMessage: "Registration successful" } });
      } else {
        console.error("Registration failed:", response.data);
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
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
          <button type="submit" className="login-button">Register</button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="link-text">
            Login
          </span>
        </p>

        <button className="back-button" onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
  );
};

export default Register;
