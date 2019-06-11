import React, { Component } from 'react';
import Sidebar from './Sidebar';
import AddContactForm from './AddContactForm';

class AddContact extends Component {
    render() {
        return(
            <div className="container">
                <div className="row no-gutters chat-container">
                    <Sidebar />
                    <AddContactForm />
                </div>
            </div>
        )
    }
}

export default AddContact