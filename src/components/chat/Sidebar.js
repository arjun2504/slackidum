import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Sidebar extends Component {

    render() {
        console.log('prop',this.props);
        return (
            <div className="col-md-4 col-sm-12 sidebar text-light">
                <div className="sidebar-title">
                    <h3 className="float-left"><i className="fas fa-users"></i> Groups</h3>
                    <Link to="/add-group" class="sidebar-btn"><h3 className="fas fa-plus float-right"></h3></Link>
                </div>
                <div className="sidebar-list">
                    <div className="list-group">
                        {
                            this.props.groups && this.props.groups.map(group => (
                                <NavLink to={ "/group/" + group.group } className="list-group-item list-group-item-action"><i className="fas fa-hashtag"></i> { group.group }</NavLink>
                            ))
                        }
                    </div>
                </div>

                <div className="sidebar-title">
                    <h3 className="float-left"><i className="fas fa-user"></i> Contacts</h3>
                    <Link to="/add-contact" class="sidebar-btn"><h3 className="fas fa-plus float-right"></h3></Link>
                </div>
                <div className="sidebar-list">
                    <div className="list-group">
                        {
                            this.props.contacts && this.props.contacts.map(contact => (
                                <NavLink key={contact.id} to={ "/chat/" + contact.username} className="list-group-item list-group-item-action"><i className="fas fa-circle"></i> {contact.username}</NavLink>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { groups: state.chat.groups, contacts: state.chat.contacts }
}

export default connect(mapStateToProps)(Sidebar)