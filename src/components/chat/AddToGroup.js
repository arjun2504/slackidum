import React, { Component } from 'react';
import Sidebar from './Sidebar';
import AddToGroupForm from './AddToGroupForm';

class AddToGroup extends Component {
    render() {
        return(
            <div className="container">
                <div className="row no-gutters chat-container">
                    <Sidebar />
                    <AddToGroupForm />
                </div>
            </div>
        )
    }
}

export default AddToGroup