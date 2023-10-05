import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Nav = styled.nav`
    background-color: #333;
    padding: 10px 0;
`;

const NavLink = styled(Link)`
    margin: 0 15px;
    color: white;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

function NavBar() {
    return (
        <Nav>
            <NavLink to="/feed">Feed</NavLink>
            <NavLink to="/initiate">Initiate Topic</NavLink>
            <NavLink to="/login">LogIn</NavLink>
            
            {/* ... other links */}
        </Nav>
    );
}

export default NavBar;
