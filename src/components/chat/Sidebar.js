import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserContacts } from '../../store/actions/chatActions'
import { getUserGroups } from '../../store/actions/groupActions'
import { DJANGO_ENDPOINT, DJANGO_WS_ENDPOINT } from '../../constants'
// import { opSocket, nmSocket } from './sockets';


class Sidebar extends Component {

    constructor(props, soc) {
        super(props);
        this.pres = new WebSocket(DJANGO_WS_ENDPOINT + 'presence/' + localStorage.username + '/');
        this.newmsg = new WebSocket(DJANGO_WS_ENDPOINT + 'newmsg/' + localStorage.username + '/');
    }

    componentDidMount() {
        this.props.getUserGroups();
        this.props.getUserContacts();

        this.pres.onmessage = function(e) { console.log('new online user'); this.props.getUserContacts(); }.bind(this);
        this.pres.onclose = function(e) { console.log('stopped showing online users'); }.bind(this);

        this.newmsg.onmessage = function(e) {
            var from_user = JSON.parse(e.data).message;
            this.props.getUserContacts(JSON.parse(e.data).message);
            console.log(this.props.match.params.username);
            if(from_user !== this.props.username) {
                setTimeout(() => {
                    var elem = document.getElementsByClassName('username-here').length;
                    for(var i=0; i<document.getElementsByClassName('username-here').length; i++) {
                        if(document.getElementsByClassName('username-here')[i].innerHTML == from_user) {
                            document.getElementById('audio').play();
                            document.getElementsByClassName('username-here')[i].parentNode.classList.add('new-msg-highlight');
                        }
                    }
                }, 1000);
            }
        }.bind(this);
        this.newmsg.onclose = function(e) { console.log('stopped notifying new messages'); }.bind(this);

    }

    handleClick = (e, room_type) => {
        var caller = e.target || e.srcElement;
        caller.classList.remove('new-msg-highlight');
        this.props.room_type(room_type);
    }


    componentWillUnmount() {
        this.pres.close();
        this.newmsg.close();   
    }

    render() {
        return (
            <div className="col-md-4 col-sm-12 sidebar text-light">
                <div className="user-avatar shadow-lg">
                    <i className="online-icon fas fa-circle"></i> { localStorage.username }
                    <Link to="/logout" title="Logout"><h4 className="fas fa-power-off float-right text-white pt-1"></h4></Link>
                </div>
                <div className="sidebar-title">
                    <h3 className="float-left"><i className="fas fa-users"></i> Groups</h3>
                    <Link to="/add-group" className="sidebar-btn"><h3><i className="fas fa-plus float-right"></i></h3></Link>
                </div>
                <div className="sidebar-list">
                    <div className="list-group">
                        {
                            (this.props.groups.length > 0) ? this.props.groups.map(group => (
                                <NavLink to={ "/group/" + group.group_name } onClick={(e) => this.handleClick(e, 'group')}  className="list-group-item list-group-item-action" key={group.id}><i className="fas fa-hashtag"></i> { group.group_name }</NavLink>
                            )) : (<small className="text-slmuted text-center">There are no groups you've been added.<br/>Click + icon to create a group and add users.</small>)
                        }
                    </div>
                </div>

                <div className="sidebar-title">
                    <h3 className="float-left"><i className="fas fa-user"></i> Contacts</h3>
                    <Link to="/add-contact" className="sidebar-btn"><h3><i className="fas fa-plus float-right"></i></h3></Link>
                </div>
                <div className="sidebar-list">
                    <div className="list-group" id="contact-list">
                        {
                            (this.props.contacts.length > 0) ? this.props.contacts.map(contact => (
                                <NavLink onClick={(e) => this.handleClick(e, 'chat')} key={contact.id} to={ "/chat/" + contact.username} className="list-group-item list-group-item-action"><span className={(contact.is_online) ? 'online-icon' : 'offline-icon'}><i className="fas fa-circle"></i></span> <span className="username-here">{contact.username}</span></NavLink>
                            )) : (<small className="text-slmuted text-center">There are no contacts added.<br/>Click + icon to add contacts.</small>)
                        }
                    </div>
                </div>
                <audio id="audio" src="/static/audio/newmsg.ogg" ></audio>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { groups: state.group.groups, contacts: state.chat.contacts }
}

const mapDispachToProps = (dispatch) => {
    return {
        getUserGroups: () => dispatch(getUserGroups()),
        getUserContacts: (new_msg_from) => dispatch(getUserContacts(new_msg_from))
    }
}

export default connect(mapStateToProps, mapDispachToProps)(withRouter(Sidebar))