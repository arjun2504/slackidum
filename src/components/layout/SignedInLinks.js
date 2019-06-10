import React from 'react'
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => {
    return (
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" title="Sign out"><i className="fas fa-sign-out-alt"></i> Sign out</NavLink>
                </li>
            </ul>    
        </div>
    )
}

export default SignedInLinks