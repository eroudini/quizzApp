import React from 'react';
import { Link } from 'react-router-dom';  // Utiliser Link pour une navigation sans rechargement de page
import "../styles/navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/" className="navbar-logo-link">MyApp</Link>
                </div>
                <ul className="navbar-links">
                    <li className="navbar-item">
                        <Link to="/home" className="navbar-link">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/categories" className="navbar-link">Categories</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/ranking" className="navbar-link">Ranking</Link>
                    </li>
                </ul>
                <div className="navbar-auth">
                    <Link to="/login" className="navbar-btn">Login</Link>
                    <Link to="/register" className="navbar-btn">Register</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
