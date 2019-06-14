import React, { Component } from 'react';
import Sidebar from './Sidebar';
import AddToGroupForm from './AddToGroupForm';

class AddToGroup extends Component {
    state = {
        room_type: 'group'
    }

    changeRoomType = (room_type) => {
        this.setState({ room_type: room_type })
    }
    
    render() {

        return(
            <div className="container">
                <div className="row no-gutters chat-container">
                    <Sidebar room_type={this.changeRoomType} />
                    <AddToGroupForm />
                </div>
            </div>
        )
    }
}

export default AddToGroup