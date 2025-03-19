import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-box">
        <h1>Welcome to the Quiz App</h1>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
        <button onClick={() => navigate("/quiz")}>Play Quiz as Guest</button>
      </div>
    </div>
  );
};

export default Home;
