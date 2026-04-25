import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { mockUser } from "../data/staticData";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = true;
  const user = isLoggedIn ? mockUser : null;

  const navLink = (path, label) => (
    <li className="nav-item">
      <Link
        to={path}
        className={`nav-link ${location.pathname === path ? "active fw-semibold" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          🏠 RentEasy
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLink("/", "Home")}
            {navLink("/properties", "Properties")}
            {user && navLink("/dashboard", "Dashboard")}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold"
                  style={{ width: 34, height: 34, fontSize: "0.85rem" }}
                >
                  {user.name.charAt(0)}
                </span>
                <span className="text-light small">{user.name}</span>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
