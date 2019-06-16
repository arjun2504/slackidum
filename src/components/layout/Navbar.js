import React, { Component } from 'react';
import logo from '../../slackidum-logo.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkIfTokenPresent } from '../../store/actions/authActions';
import GitHubButton from 'react-github-btn';

class Navbar extends Component {

    render() {
        
        return (this.props.location.pathname === '/register' || this.props.location.pathname === '/') ? (<span></span>) : (
            <nav className="navbar navbar-expand-lg bg-light shadow-sm bg-white">
                <div className="container">
                <Link className="navbar-brand mr-auto" to="/">
                    <img src={logo} className="d-inline-block align-top pr-2" alt="" /> 
                </Link>
                <div className="justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <GitHubButton href="https://github.com/arjun2504/slackidum/fork" data-icon="octicon-repo-forked" data-size="large" aria-label="Fork arjun2504/slackidum on GitHub">Fork on GitHub</GitHubButton>
                        </li>
                    </ul>    
                </div>
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
