// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../App.css";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">NutriPueblo</Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Inicio</Link>
            </li>

            <li className="nav-item">
              <Link to="/alimentos" className={`nav-link ${isActive("/alimentos") ? "active" : ""}`}>Alimentos</Link>
            </li>

            <li className="nav-item">
              <Link to="/guia" className={`nav-link ${isActive("/guia") ? "active" : ""}`}>Bienestar</Link>
            </li>

            <li className="nav-item">
              <Link to="/recetas" className={`nav-link ${isActive("/recetas") ? "active" : ""}`}>Recetas</Link>
            </li>

            {/* NUEVO ITEM - AGREGAR ESTO */}
            <li className="nav-item">
              <Link
                to="/nutricion-ia"
                className={`nav-link ${isActive("/nutricionIA") ? "active" : ""}`}
              >
                Menú IA
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
