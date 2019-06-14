import React, { Component } from 'react';
import UserQueue from './UserQueue';
import { connect } from 'react-redux';
import { createGroup } from '../../store/actions/chatActions';

class AddToGroupForm extends Component {

    state = {
        group_name: '',
        queue: [],
        create_group_message: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    getQueue = (queue) => {
        this.setState({ ...this.state, queue: queue });
    }

    handleClick = (e) => {
        this.props.createGroup(this.state.queue, this.state.group_name);
    }

    render() {
        return(
            <div className="col-md-8 col-sm-12 add-contact-container">
            <h1 className="d-inline-block">Create Group</h1>
                <button onClick={this.handleClick} className="btn btn-slcolor float-right p-2 mt-2"  type="button"><i className="fas fa-check-circle"></i> Save</button>
                <div className="clearfix"></div>
                <small className="text-danger">{ this.props.create_group_message }</small>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="group_name">Group Name</label>
                        <input type="text" onChange={this.handleChange} className="form-control" id="group_name" aria-describedby="group_name" />
                    </div>
                </form>
                <div className="clearfix"></div>
                <UserQueue {...this.props} trackQueue={this.getQueue} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGroup: (queue, group_name) => dispatch(createGroup(queue, group_name))
    }
}

const mapStateToProps = (state) => {
    return {
        create_group_message: state.chat.create_group_message
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToGroupForm)