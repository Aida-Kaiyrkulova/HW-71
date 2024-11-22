import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Turtle Pizza Admin</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/admin/dishes" className="nav-link">
              Dishes
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="nav-link">
              Orders
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;