import React, { Component } from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import logo from '../../slackidum-logo.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkIfTokenPresent } from '../../store/actions/authActions';

class Navbar extends Component {

    render() {
        
        return (this.props.location.pathname == '/register' || this.props.location.pathname == '/') ? (<span></span>) : (
            <nav className="navbar navbar-expand-lg bg-light shadow-sm bg-white">
                <div className="container">
                <Link className="navbar-brand mr-auto" to="/">
                    <img src={logo} className="d-inline-block align-top pr-2" alt="" /> 
                </Link>
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                {/* { (this.props.is_logged_in) ? (<SignedInLinks />) : (<SignedOutLinks />) } */}
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        is_logged_in: state.auth.is_logged_in
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkIfTokenPresent: () => dispatch(checkIfTokenPresent())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))
