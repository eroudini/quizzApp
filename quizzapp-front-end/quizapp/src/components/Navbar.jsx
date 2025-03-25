import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false); // État pour le menu des catégories
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // État pour le menu utilisateur
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);  // Pour stocker les informations de l'utilisateur

  // Vérification de l'authentification au chargement
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Récupérer les informations de l'utilisateur si connecté
        const fetchUser = async () => {
          try {
            const response = await axios.get("http://localhost:8080/auth/me", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setIsAuthenticated(true);
            setUser(response.data); // Stocke les infos de l'utilisateur
          } catch (error) {
            console.error("Token invalid or expired", error);
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          }
        };
        fetchUser();
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error retrieving categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
    setIsCategoryDropdownOpen(false); // Ferme le menu des catégories lorsque l'on clique sur une catégorie
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    setUser(null);  // Réinitialise les infos de l'utilisateur
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleCategoryDropdownToggle = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    setIsUserDropdownOpen(false); // Ferme le menu utilisateur si le menu des catégories est ouvert
  };

  const handleUserDropdownToggle = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsCategoryDropdownOpen(false); // Ferme le menu des catégories si le menu utilisateur est ouvert
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-link">Quizz App</Link>
        </div>
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link to="/home" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <button className="navbar-link" onClick={handleCategoryDropdownToggle}>
              Catégories
            </button>
            {isCategoryDropdownOpen && (
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
          </li>
          <li className="navbar-item">
            <Link to="/ranking" className="navbar-link">Ranking</Link>
          </li>
        </ul>
        <div className="navbar-auth">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="navbar-btn login">Login</Link>
              <Link to="/register" className="navbar-btn register">Register</Link>
            </>
          ) : (
            <>
              {/* Bouton utilisateur */}
              <button onClick={handleUserDropdownToggle} className="navbar-btn user-menu-toggle">
                {user?.username} <span>▼</span> {/* Affiche le nom de l'utilisateur */}
              </button>

              {/* Menu déroulant utilisateur */}
              {isUserDropdownOpen && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <p>{user?.username}</p>
                    <p>{user?.email}</p>
                  </div>
                  <button onClick={handleLogout} className="navbar-btn logout">
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
