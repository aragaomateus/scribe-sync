import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar() {
    return (
        <div className="nav">
            <Link className="nav-link" to="/feed">Feed</Link>
            <Link className="nav-link" to="/initiate">Initiate Topic</Link>
            <Link className="nav-link" to="/login">LogIn</Link>
            {/* ... other links */}
        </div>
    );
}

export default NavBar;
