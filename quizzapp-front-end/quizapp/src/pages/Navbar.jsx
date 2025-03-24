import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUser = async () => {
        try {
          await axios.get("http://localhost:8080/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAuthenticated(true);
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
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Quizz App
      </h1>
      <div className="nav-links">
        {!isAuthenticated ? (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
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
