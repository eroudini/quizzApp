import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
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
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
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
            <button className="navbar-link" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
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
            <button onClick={handleLogout} className="navbar-btn logout">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
