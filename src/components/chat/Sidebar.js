import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserContacts } from '../../store/actions/chatActions'
import { getUserGroups } from '../../store/actions/groupActions'
import { DJANGO_ENDPOINT, DJANGO_WS_ENDPOINT } from '../../constants'

class Sidebar extends Component {
    
    componentDidMount() {
        this.props.getUserGroups();
        this.props.getUserContacts();

        var opSocket = new WebSocket(DJANGO_WS_ENDPOINT + 'presence/' + localStorage.username + '/');

        opSocket.onmessage = function(e) {
            var data = JSON.parse(e.data);
            this.props.getUserContacts();
        }.bind(this);

        opSocket.onclose = function(e) {
            console.log('offline');
        }.bind(this);
    }

    handleClick = (room_type) => {
        this.props.room_type(room_type);
    }

    render() {
        return (
            <div className="col-md-4 col-sm-12 sidebar text-light">
                <div className=""></div>
                <div className="sidebar-title">
                    <h3 className="float-left"><i className="fas fa-users"></i> Groups</h3>
                    <Link to="/add-group" className="sidebar-btn"><h3><i className="fas fa-plus float-right"></i></h3></Link>
                </div>
                <div className="sidebar-list">
                    <div className="list-group">
                        {
                            (this.props.groups.length > 0) ? this.props.groups.map(group => (
                                <NavLink to={ "/group/" + group.group_name } onClick={() => this.handleClick('group')}  className="list-group-item list-group-item-action" key={group.id}><i className="fas fa-hashtag"></i> { group.group_name }</NavLink>
                            )) : (<small className="text-slmuted text-center">There are no groups you've been added.<br/>Click + icon to create a group and add users.</small>)
                        }
                    </div>
                </div>

                <div className="sidebar-title">
                    <h3 className="float-left"><i className="fas fa-user"></i> Contacts</h3>
                    <Link to="/add-contact" className="sidebar-btn"><h3><i className="fas fa-plus float-right"></i></h3></Link>
                </div>
                <div className="sidebar-list">
                    <div className="list-group">
                        {
                            (this.props.groups.length > 0) ? this.props.contacts.map(contact => (
                                <NavLink onClick={() => this.handleClick('chat')} key={contact.id} to={ "/chat/" + contact.username} className="list-group-item list-group-item-action"><span className={(contact.is_online) ? 'online-icon' : 'offline-icon'}><i className="fas fa-circle"></i></span> {contact.username}</NavLink>
                            )) : (<small className="text-slmuted text-center">There are no contacts added.<br/>Click + icon to add contacts.</small>)
                        }
                    </div>
                </div>
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
        getUserContacts: () => dispatch(getUserContacts())
    }
}

export default connect(mapStateToProps, mapDispachToProps)(withRouter(Sidebar))