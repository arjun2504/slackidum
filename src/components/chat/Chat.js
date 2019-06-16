import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { connectToRoom, sendMessage, preLoadMessages } from '../../store/actions/msgActions';
import Moment from 'react-moment';

class Chat extends Component {

    state = {
        room_name: null,
        message: '',
        chat_thread: [],
        next_page: null,
        room_type: this.props.chatType
    }

    autoScrollToTop = () => {
        var objDiv = document.getElementById("threads");
        try {
            objDiv.scrollTop = objDiv.scrollHeight;
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.props.connectToRoom(this.props.username, this.state.room_type);
        this.props.preLoadMessages(this.props.username, this.state.room_type);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.username !== nextProps.username) {
            this.props.connectToRoom(nextProps.username, this.state.room_type);
            this.props.preLoadMessages(nextProps.username, this.state.room_type);
        }
        
        this.setState({ ...this.state, chat_thread: this.props.chat_thread, next_page: this.props.next_page, room_type: (this.props.match.path.startsWith('/chat')) ? 'chat': 'group' });
    }

    componentDidUpdate() {
        if((this.state.chat_thread.length !== this.props.chat_thread) && (this.state.next_page == this.props.next_page)) {
            this.autoScrollToTop();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleKey = (e) => {
        if(e.keyCode === 13 && !e.shiftKey) {
            console.log('send: ' + this.props.username);
            this.props.sendMessage(this.state.message.trim(), this.props.slug, this.props.username);
            document.getElementById('chat-input-form').reset();
            this.autoScrollToTop();
        }
        this.setState({ ...this.state, message: e.target.value });
    }

    loadPreviousMessage = (next_page) => {
        this.props.preLoadMessages(this.props.username, this.state.room_type, next_page);
    }

    render() {
        
        return (this.props.username) ? (
            <div className="col-md-8 col-sm-12 chat-screen">
                <div className="chat-thread-header shadow-sm">
                    <div className="row">
                        <div className="col-md-6 p-2 ml-4">
                            <h5>{ (this.state.room_type == 'group') ? '#' : '' } { this.props.username }</h5>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                </div>
                <div className="chat-thread-container" id="threads">
                    { (this.props.next_page !== null) && (<div className="text-center prev-message-link" onClick={() => this.loadPreviousMessage(this.props.next_page)}>Load previous messages</div>) }
                    { this.props.chat_thread && this.props.chat_thread.map((t,i) => {
                        if(t.room_name === this.props.room_name)
                        return (
                        <div className="media chat-message" key={'thread-' + i}>
                            {/* <img src="https://via.placeholder.com/64" className="mr-3" alt="..." /> */}
                            <div className={ (t.from_user == localStorage.username) ? 'media-body text-right' : 'media-body text-left' }>
                                <h5 className="mt-0">{ t.from_user }</h5>
                                { t.message }<br/>
                                <small className="text-muted"><Moment fromNow>{ t.timestamp }</Moment></small>
                            </div>
                        </div>
                    ) }) }
                </div>
                <div className="chat-input-container">
                    <form id="chat-input-form" onSubmit={this.handleSubmit}>
                        <textarea onKeyUp={this.handleKey} className="form-control" rows="1" placeholder="Type a message..."></textarea>
                    </form>
                </div>
            </div>
        ) : (
            <div className="col-md-8 col-sm-12 no-chat-screen">
                <div className="new-convo">
                    <img src="/static/images/grin.png" alt="Start Convo" />
                    <h3>Start your conversation.</h3>
                    <p>Click on a contact on the sidebar to start a conversation.<br/>Click + to add a contact or create a group.</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        room_name: state.msg.room_name,
        chat_thread: state.msg.chat_thread,
        next_page: state.msg.next_page
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message, room_name, to_user) => dispatch(sendMessage(message, room_name, to_user)),
        connectToRoom: (username, room_type) => dispatch(connectToRoom(username, room_type)),
        preLoadMessages: (username, room_type, page_number) => dispatch(preLoadMessages(username, room_type, page_number))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chat))