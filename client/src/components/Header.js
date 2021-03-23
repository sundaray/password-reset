import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./stateSlices/loginSlice";

const Header = ({
  menuOpen,
  onMenuClick,
  onOverlayClick,
  onSidedrawerNavbarLinkClick,
}) => {
  const { user } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const logoutSubmitHandler = () => {
    dispatch(logout());
    localStorage.removeItem("loggedInUser");
    window.location = "/";
  };

  return (
    <header>
      <ul className="navbar-list">
        <li className="navbar-list-item">
          <NavLink
            to="/"
            exact
            className="navbar-link"
            activeStyle={{ color: "#F2F2F2" }}
          >
            Home
          </NavLink>
        </li>
        <li className="navbar-list-item">
          <NavLink
            to="/about"
            className="navbar-link"
            activeStyle={{ color: "#F2F2F2" }}
          >
            About
          </NavLink>
        </li>
        <li className="navbar-list-item">
          <NavLink
            to="/projects"
            className="navbar-link"
            activeStyle={{ color: "#F2F2F2" }}
          >
            Projects
          </NavLink>
        </li>
        <li className="navbar-list-item">
          <NavLink
            to="/cv"
            className="navbar-link"
            activeStyle={{ color: "#F2F2F2" }}
          >
            CV
          </NavLink>
        </li>
        {user ? (
          <div class="dropdown">
            <button
              className="btn btn-lg btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {user.firstName}
            </button>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenu2"
            >
              <button
                className="dropdown-item"
                type="button"
                onClick={logoutSubmitHandler}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <li className="navbar-list-item">
            <NavLink
              to="/registerLogin"
              className="navbar-link"
              activeStyle={{ color: "#F2F2F2" }}
            >
              Register/Login
            </NavLink>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
