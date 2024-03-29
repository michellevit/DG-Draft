import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../contexts/UserContext";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav>
      <Link to="/" className="title">
        DG Draft
      </Link>
      <div className={"menu" + (menuOpen ? " icon-open" : "")} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        {user && (
          <li>
            <NavLink to="/challenges" onClick={() => setMenuOpen(false)}>
              Challenges
            </NavLink>
          </li>
        )}
        {user && (
          <li>
            <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </NavLink>
          </li>
        )}
        {!user && (
          <li>
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </NavLink>
          </li>
        )}
        {!user && (
          <li>
            <NavLink to="/signup" onClick={() => setMenuOpen(false)}>
              Sign Up
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;