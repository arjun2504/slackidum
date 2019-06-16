import React, { Component } from 'react';
import { getUserSuggestions } from '../../store/actions/chatActions';
import { connect } from 'react-redux';

class UserQueue extends Component {

    state = {
        username: '',
        suggestions: [],
        queue: []
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
        this.props.getUserSuggestions(e.target.value);
    }

    handleAddQueue = (username, id) => {
        var o = this.state.queue.find(o => o.username === username );
        if(!o) {
            var newQueue = this.state.queue.concat({ username: username, id: id });
            this.setState({ queue: newQueue });
            this.props.trackQueue(newQueue);
        }
        document.getElementById('user-suggest-form').reset();
        this.props.getUserSuggestions(document.getElementById('name').value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleRemoveQueue = (username, id) => {
        var newQueue = this.state.queue.filter((item) => item.username !== username);
        this.setState({ queue: newQueue })
        document.getElementById('user-suggest-form').reset();
        this.props.trackQueue(newQueue);
        this.props.getUserSuggestions(document.getElementById('name').value);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-sm-12">
                        <form id="user-suggest-form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                    <label htmlFor="name">Start typing a name...</label>
                                    <input type="text" autocomplete="off" onChange={this.handleChange} className="form-control" id="name" aria-describedby="name" placeholder="Enter username..." />
                            </div>
                        </form>
                        <div className="user-suggest-container">
                            {
                                this.props.suggestions && this.props.suggestions.map(r => (
                                    <div className="user-result" key={r.id} onClick={() => this.handleAddQueue(r.username, r.id)}>{ r.username }</div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="user-suggest-container user-added-queue">
                            {
                                (this.state.queue.length === 0) ? (<p className="text-muted" align="center">No users selected.</p>) : this.state.queue.map(r => (
                                    <div className="user-result" onClick={() => this.handleRemoveQueue(r.username, r.id)} key={r.id}>{ r.username }<span className="text-success p-1 float-right fas fa-check"></span></div>
                                ))
                            }
                            {
                                (this.state.queue.length !== 0) ? (<small className="text-muted"><center>Click on a username to remove from queue.</center></small>) : (<p></p>)
                            }
                        </div>
                    </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserSuggestions: (keyword) => dispatch(getUserSuggestions(keyword))
    }
}

const mapStateToProps = (state) => {
    return {
        suggestions: state.chat.suggestions
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserQueue)
