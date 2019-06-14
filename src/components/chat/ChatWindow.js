import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import GroupChat from './GroupChat';
import { withRouter } from 'react-router-dom';

class ChatWindow extends Component {

    state = {
        room_type: (this.props.match.path.startsWith('/chat')) ? 'chat' : 'group'
    }

    changeRoomType = (room_type) => {
        this.setState({ room_type: room_type })
    }

    render() {
        console.log(this.props);
        return (
            <div className="container">
                <div className="row no-gutters chat-container">
                    <Sidebar room_type={this.changeRoomType} />
                    { (this.state.room_type == 'chat') ? (<Chat {...this.props} chatType={this.state.room_type} username={this.props.match.params.username} />) : (<GroupChat {...this.props} chatType={this.state.room_type} username={this.props.match.params.group} />) }
                </div>
            </div>
        )
    }
}

export default withRouter(ChatWindow)