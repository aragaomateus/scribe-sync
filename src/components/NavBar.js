import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import { useNavigate } from 'react-router';

function NavBar() {
    const navigate = useNavigate();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        // This will run every time the local storage changes
        const handleStorageChange = () => {
            setUser(JSON.parse(localStorage.getItem('user')));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate("/feed")
    };


    return (
        <div className="nav">
            <Link className="nav-link" to="/feed">Feed</Link>
            {user ? <Link className="nav-link" to="/initiate">Start a Scribe</Link> : null}
            {/* ... other links */}
            <div className="profile-dropdown">
                <span>{user ? user.name : 'Profile'}</span>
                <div className="profile-dropdown-content">
                    {user ? (
                        <>
                            <Link to="/profile">View Profile</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NavBar;

