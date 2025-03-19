import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // État pour stocker les catégories
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // État pour gérer l'ouverture du menu déroulant

  // Récupérer les catégories depuis la base de données
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories"); // Remplacez par votre endpoint API
        setCategories(response.data); // Mettre à jour l'état avec les catégories récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };

    fetchCategories();
  }, []);

  // Gérer le clic sur une catégorie
  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`); // Rediriger vers la page de la catégorie
    setIsDropdownOpen(false); // Fermer le menu déroulant
  };

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
                  onClick={() => handleCategoryClick(category.id)}
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