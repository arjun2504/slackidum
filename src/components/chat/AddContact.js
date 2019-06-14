import React, { Component } from 'react';
import Sidebar from './Sidebar';
import AddContactForm from './AddContactForm';

class AddContact extends Component {

    state = {
        room_type: 'chat'
    }

    changeRoomType = (room_type) => {
        this.setState({ room_type: room_type })
    }
    
    render() {

        return(
            <div className="container">
                <div className="row no-gutters chat-container">
                    <Sidebar room_type={this.changeRoomType} />
                    <AddContactForm />
                </div>
            </div>
        )
    }
}

export default AddContact