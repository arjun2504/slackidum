import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateUser } from '../../store/actions/authActions';
import logo from '../../slackidum-logo.png';

class Login extends Component {

    state = {
        username: '',
        password: '',
        isNavBarHidden: true
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.authenticateUser(this.state);
        document.getElementById('login-form').reset();
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {

        if(localStorage.getItem('token'))
            return (
                <Redirect to='/chat' />
            )
            
        return (
            <div className="container ">
                <div className="row justify-content-md-center vertical-center">
                    
                    <div className="col-sm-12 col-md-5">
                        <div className="text-center"><img src={logo} className="d-inline-block align-top pr-2" alt="" /> </div>
                        <div className="sign-in-container shadow-lg">
                            {/* <h2>Sign In <i className="fas fa-sign-in-alt"></i></h2>
                            <hr/> */}
                            <form id="login-form" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" onChange={this.handleChange} className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username" />
                                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" onChange={this.handleChange} className="form-control" id="password" placeholder="Password" />
                                </div>
                                <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <button type="submit" className="btn btn-slcolor">Sign In</button>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <p className="float-right pt-2">New user? <Link to="/register">Register here</Link></p>
                                </div>
                                </div>
                                <small id="loginHelp" className="form-text text-danger">{this.props.login_message}</small>
                            </form>

                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticateUser: (user) => dispatch(authenticateUser(user))
    }
}

const mapStateToProps = (state) => {
    return {
        login_message: state.auth.login_message
    }
}
// const mapStateToProps = (state) => {
//     return {
        
//     }
// }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
