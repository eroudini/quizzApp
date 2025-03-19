import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Quizz App</h1>
      <div className="nav-links">
        <button onClick={() => navigate("/login")}>Se connecter</button>
        <button onClick={() => navigate("/register")}>S'enregistrer</button>
        <button onClick={() => navigate("/")}>Jouer</button>
        <button onClick={() => navigate("/categories")}>Categories</button>
      </div>
    </nav>
  );
};

export default Navbar;