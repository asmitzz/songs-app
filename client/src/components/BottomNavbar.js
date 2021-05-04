import React from 'react';

import { Link } from 'react-router-dom';

const BottomNavbar = () => {

    return (
        <nav className="nav nav-bottom">
          <ul className="nav-items">
            <li className="nav-item">
               <Link to="/" className="nav-link"><i className="fas fa-home"></i><small>Home</small></Link>
            </li>

            <li className="nav-item">
               <Link to="/search" className="nav-link"><i className="fas fa-search " aria-hidden="true"></i><small>Search</small></Link>
            </li>

            <li className="nav-item">
               <Link to="/history" className="nav-link"><i className="fas fa-history" aria-hidden="true"></i><small>Recents</small></Link>
            </li>

            <li className="nav-item">
               <Link to="/mylibrary" className="nav-link"><i className="fas fa-user" aria-hidden="true"></i><small>My Library</small></Link>
            </li>
          </ul>
       </nav>
    )
}

export default BottomNavbar;
