import React, { Component } from 'react'
import { registerUser, checkAvailability } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Register extends Component {

    state = {
        username: this.props.username,
        password: this.props.password,
        password2: this.props.password2,
        is_username_available: this.props.is_username_available
    }

    formValid() {
        var formValid = true;
        if (this.props.is_username_available !== true) { formValid = false; }
        if (this.state.password !== this.state.password2) { formValid = false; }
        if (this.state.password.length < 6) { formValid = false; }
        if (this.state.username.length < 3) { formValid = false; }
        return formValid;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.registerUser(this.state);
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        // const canBeSubmitted = this.formValid();
        return (
            <div className="container">
                <div className="row justify-content-md-center page-container">
                    <div className="col col-md-6">
                        <div className="sign-in-container">
                        <h1>Register</h1>
                        <hr/>
                        <form id="register-form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Username</label>
                                <input required type="text" onChange={this.handleChange} className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Pick a username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input required type="password" onChange={this.handleChange} className="form-control" id="password" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password2">Re-type Password</label>
                                <input required type="password" onChange={this.handleChange} className="form-control" id="password2" placeholder="Password" />
                            </div>
                            <small id="emailHelp" className="form-text text-danger mb-3">{this.props.register_message}</small>
                            <button type="submit" className="btn btn-slcolor">Register</button>
                            <p className="float-right mt-2">Returning user? <Link to="/">Login</Link></p>
                            
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
        registerUser: (user) => dispatch(registerUser(user)),
        checkAvailability: (username) => dispatch(checkAvailability(username))
    }
}

const mapStateToProps = (state) => {
    return {
        is_username_available: state.auth.is_username_available,
        username: state.auth.username,
        password: state.auth.password,
        password2: state.auth.password2,
        register_message: state.auth.register_message
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
