import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="pte-nav">
      <div className="pte-nav-container">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `pte-nav-link ${isActive ? 'pte-nav-link--active' : ''}`
          }
        >
          Email Generator
        </NavLink>
        <NavLink
          to="/validation"
          className={({ isActive }) =>
            `pte-nav-link ${isActive ? 'pte-nav-link--active' : ''}`
          }
        >
          HTML Validator
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
