import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use Link for better navigation
import "../../styles/header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">WorkSpace Finder</Link>
      </div>
      <div className={`nav ${isOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/results">Results</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/addworkplace">Add Work Place</Link></li>
          <li><Link to="/promote">Promote</Link></li> {/* Added Promote link */}
        </ul>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
    </header>
  );
};

export default Header;
