import React, { Component } from 'react'
import { registerUser } from '../../store/actions/authActions';
import { connect } from 'react-redux';

class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        password2: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.registerUser(this.state);
        document.getElementById('register-form').reset();
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col col-md-6">
                        <h1>Register</h1>
                        <hr/>
                        <form id="register-form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" onChange={this.handleChange} className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" onChange={this.handleChange} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" onChange={this.handleChange} className="form-control" id="password" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password2">Re-type Password</label>
                                <input type="password" onChange={this.handleChange} className="form-control" id="password2" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-slcolor">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (user) => dispatch(registerUser(user))
    }
}

export default connect(null, mapDispatchToProps)(Register)
