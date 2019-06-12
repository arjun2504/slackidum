import React from 'react'
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <div className="justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/register" className="nav-link" title="New here? Sign up for an account">
                        <button className="btn btn-slcolor">Register</button>
                    </NavLink>
                </li>
            </ul>    
        </div>
    )
}

export default SignedOutLinks