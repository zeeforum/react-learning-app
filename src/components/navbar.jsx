import React from 'react';

const NavBar = ({ totalCounters }) => {
    return ( 
        <nav className="navbar navbar-light bg-light">
            <a href="/" className="navbar-brand">
                Navbar text&nbsp;&nbsp;
                <span className="badge badge-secondary">{totalCounters}</span>
            </a>
        </nav>
    );
}
 
export default NavBar;