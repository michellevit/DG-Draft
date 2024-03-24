import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../contexts/UserContext";
import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap');



const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser(); 
  return (
    <nav>
      <Link to="/" className="title">DG Draft</Link>
      <div className={"menu" + (menuOpen ? " icon-open" : "")} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        {user && <li><NavLink to="/challenges">Challenges</NavLink></li>}
        {user && <li><NavLink to="/profile">Profile</NavLink></li>}
        {!user && <li><NavLink to="/login">Login</NavLink></li>}
        {!user && <li><NavLink to="/signup">Sign Up</NavLink></li>}
      </ul>
    </nav>
  )
}

export default Navbar;
