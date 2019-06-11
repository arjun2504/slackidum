import React, { Component } from 'react';
import Sidebar from './Sidebar';


class AddContact extends Component {

    state = {
        username: '',
        suggested_users: []
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();

    }

    render() {
        return(
            <div className="col-md-8 col-sm-12 add-contact-container">
                <h1>Add Contact</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                            <label htmlFor="name">Start typing a name...</label>
                            <input type="text" onChange={this.handleChange} className="form-control" id="name" aria-describedby="name" placeholder="Enter username..." />
                        </div>
                </form>
            </div>
        )
    }
}

export default AddContact