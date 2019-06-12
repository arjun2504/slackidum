import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToContacts } from '../../store/actions/chatActions'
import UserQueue from './UserQueue';

class AddContactForm extends Component {

    state = {
        queue: []
    }

    getQueue = (queue) => {
        this.setState({ ...this.state, queue: queue });
    }

    handleClick = (e) => {
        this.props.addToContacts(this.state.queue);
    }

    render() {
        
        return(
            <div className="col-md-8 col-sm-12 add-contact-container">
                <h1 className="d-inline-block">Add Contacts</h1>
                <button onClick={this.handleClick} className="btn btn-slcolor float-right p-2 mt-2"  type="button"><i className="fas fa-check-circle"></i> Save</button>
                <div className="clearfix"></div>
                <UserQueue {...this.props} trackQueue={this.getQueue} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToContacts: (queue) => dispatch(addToContacts(queue))
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContactForm)