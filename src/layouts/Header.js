import React from "react";
import { NavLink } from "react-router-dom";
import UserData from "../components/UserData";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          CodesOps
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "rgba(255,255,255,.55)",
                })}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "rgba(255,255,255,.55)",
                })}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contact"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "rgba(255,255,255,.55)",
                })}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <UserData />
        </div>
      </div>
    </nav>
  );
};

export default Header;
