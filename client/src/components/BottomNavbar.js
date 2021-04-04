import React from 'react';

import { Link } from 'react-router-dom';

const BottomNavbar = () => {
    return (
        <nav className="nav nav-bottom">
          <ul className="nav-items">
            <li className="nav-item">
               <Link to="/" className="nav-link"><i className="fa fa-home"></i><small>Home</small></Link>
            </li>
            <li className="nav-item">
               <Link to="/playlist" className="nav-link"><i className="fa fa-music" aria-hidden="true"></i><small>My playlist</small></Link>
            </li>
            <li className="nav-item">
               <Link to={{ pathname:"/videos/watchLater",state:{title:"Watch Later"} }} className="nav-link"><i className="fas fa-clock" aria-hidden="true"></i><small>Watch later</small></Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link"><i className="fa fa-history" aria-hidden="true"></i><small>History</small></Link>
            </li>
          </ul>
       </nav>
    )
}

export default BottomNavbar;
