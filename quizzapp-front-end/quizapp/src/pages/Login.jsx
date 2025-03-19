import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
  
      console.log("Réponse du serveur :", response.data); // Debugging
  
      if (response.data) { // Vérifier que le backend renvoie bien un token
        localStorage.setItem("token", response.data);
        navigate("/categories");
      } else {
        console.error("Login failed: No token received");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {location.state?.successMessage && (
          <p className="success-message">{location.state.successMessage}</p>
        )}
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <button className="back-button" onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
  );
};
//ignore
export default Login;
