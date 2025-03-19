import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ onCategoryClick }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Récupérer les catégories depuis la base de données
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Quizz App
      </h1>
      <div className="nav-links">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
        <div className="dropdown">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            Catégories
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => {
                    onCategoryClick(category.id); // Appeler la fonction passée en props
                    setIsDropdownOpen(false); // Fermer le menu déroulant
                  }}
                  className="dropdown-item"
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
