import React from 'react';
//import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import logo from '../../slackidum-logo.png';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    console.log(props);
    return (
        <nav className="navbar navbar-expand-lg bg-light shadow-sm p-3 mb-5 bg-white">
            <div className="container">
            <Link className="navbar-brand mr-auto" to="/">
                <img src={logo} className="d-inline-block align-top pr-2" alt="" /> 
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* <SignedInLinks /> */}
            
            <SignedOutLinks />
            </div>
        </nav>
    )
}

export default Navbar
