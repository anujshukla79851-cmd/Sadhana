 import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className="brand">
        <span className="brand-icon">S</span>
        <span>Sadhna</span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>

        <NavLink to="/tasksetup" className="nav-link">
          Task Setup
        </NavLink>

        <NavLink to="/today" className="nav-link">
          Today
        </NavLink>

        <NavLink to="/history" className="nav-link">
          History
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;