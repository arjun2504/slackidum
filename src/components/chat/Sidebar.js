import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class Sidebar extends Component {

    render() {
        return (
            <div className="col-md-4 col-sm-12 sidebar text-light">
                <div className="sidebar-title">
                    <h3 className="float-left">Groups</h3>
                    <h3 className="fas fa-plus float-right"></h3>
                </div>
                <div className="sidebar-list">
                    <div className="list-group">
                        <NavLink to="/chat/group-slug1" className="list-group-item list-group-item-action"><i className="fas fa-hashtag"></i> Cras justo odio</NavLink>
                        <NavLink to="/chat/group-slug2" className="list-group-item list-group-item-action"><i className="fas fa-hashtag"></i> Dapibus ac facilisis in</NavLink>
                        <NavLink to="/chat/group-slug3" className="list-group-item list-group-item-action"><i className="fas fa-hashtag"></i> Morbi leo risus</NavLink>
                        <NavLink to="/chat/group-slug4" className="list-group-item list-group-item-action"><i className="fas fa-hashtag"></i> Porta ac consectetur ac</NavLink>
                        <NavLink to="/chat/group-slug5" className="list-group-item list-group-item-action"><i className="fas fa-hashtag"></i> Vestibulum at eros</NavLink>
                    </div>
                </div>

                <div className="sidebar-title">
                    <h3 className="float-left">Contacts</h3>
                    <Link to="/add-contact" class="sidebar-btn"><h3 className="fas fa-plus float-right"></h3></Link>
                </div>
                <div className="sidebar-list">
                    <div className="list-group">
                        <NavLink to="/chat/user1" className="list-group-item list-group-item-action"><i className="fas fa-circle"></i> Cras justo odio</NavLink>
                        <NavLink to="/chat/user2" className="list-group-item list-group-item-action"><i className="far fa-circle"></i> Dapibus ac facilisis in</NavLink>
                        <NavLink to="/chat/user3" className="list-group-item list-group-item-action"><i className="far fa-circle"></i> Morbi leo risus</NavLink>
                        <NavLink to="/chat/user4" className="list-group-item list-group-item-action"><i className="far fa-circle"></i> Porta ac consectetur ac</NavLink>
                        <NavLink to="/chat/user5" className="list-group-item list-group-item-action"><i className="far fa-circle"></i> Vestibulum at eros</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar