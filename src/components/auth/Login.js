import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateUser } from '../../store/actions/authActions';

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.authenticateUser(this.state);
        document.getElementById("login-form").reset();
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-7">
                    <div className="">
                        <h1 className="display-4">Hi! There?</h1>
                        <img alt="Logo" src="/static/images/slackidum-banner.png" className="homepage-banner" />
                        <p className="lead">Say Hi! to your friends, family or colleagues. You can use Slackidum at any place.</p>
                        <hr className="my-4" />
                        <p>Learn more about the features.</p>
                        <Link className="btn btn-success btn-lg" to="/about">Learn more</Link>
                    </div>
                    </div>
                    <div className="col-5">
                        <h2>Sign In <i className="fas fa-sign-in-alt"></i></h2>
                        <hr/>
                        <form id="login-form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" onChange={this.handleChange} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" onChange={this.handleChange} className="form-control" id="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-slcolor">Sign In</button>
                        </form>
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

// const mapStateToProps = (state) => {
//     return {
        
//     }
// }

export default connect(null, mapDispatchToProps)(Login)
