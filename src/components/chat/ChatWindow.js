import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';

class ChatWindow extends Component {

    render() {
        return (
            <div className="container">
                <div className="row no-gutters chat-container">
                    <Sidebar />
                    <Chat />
                </div>
            </div>
        )
    }
}

export default ChatWindow