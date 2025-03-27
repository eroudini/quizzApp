import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get("http://localhost:8080/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setIsAuthenticated(true);
            setUser(response.data);
          })
          .catch((error) => {
            console.error("Token invalide ou expiré", error);
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          });
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Quiz App
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/ranking">
                Ranking
              </NavLink>
            </li>
            {user?.role === "ADMIN" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/quiz-stepper">
                Jouer
              </NavLink>
            </li>
          </ul>

          <div className="navbar-auth">
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className="navbar-btn login">
                  Login
                </NavLink>
                <NavLink to="/register" className="navbar-btn register">
                  Register
                </NavLink>
              </>
            ) : (
              <div className="user-menu">
                <button
                  className="navbar-btn user-menu-toggle"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                >
                  {user?.username} <span>▼</span>
                </button>
                {isUserDropdownOpen && (
                  <div className="user-dropdown">
                    <p>
                      <strong>{user?.username}</strong>
                    </p>
                    <p>{user?.email}</p>
                    <button
                      onClick={handleLogout}
                      className="navbar-btn logout"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => navigate("/confirm-delete-account")}
                      className="navbar-btn delete-account"
                    >
                      Delete account
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
