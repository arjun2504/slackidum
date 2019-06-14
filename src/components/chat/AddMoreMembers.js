import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addMember, getGroupMembers } from '../../store/actions/groupActions';
import { getUserSuggestions } from '../../store/actions/chatActions';

class AddMoreMembers extends Component {

    state = {
        new_member: '',
        members_list: [],
        suggestions: []
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value.trim() });
        try {
            document.getElementById('suggestion-dropdown').style.display = "block";
        } catch(e) {
            console.log(e);
        }
        this.props.getUserSuggestions(e.target.value, this.props.members_list);
    }

    componentDidMount() {
        this.props.getGroupMembers(this.props.group);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.new_member !== '') {
            this.props.addMember(this.state.new_member, this.props.group);
            document.getElementById('add-member').reset();
        }
    }

    arraysEqual = (a, b) => {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;
      
        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.
      
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      }

    componentWillReceiveProps(nextProps) {
        if(this.arraysEqual(this.props.members_list, nextProps.members_list)) {
            this.props.getGroupMembers(this.props.group);
            this.setState({ members_list: this.props.members_list })
        }
    }

    // componentDidUpdate(nextProps) {
    //     // if(this.props.members_list !== nextProps.members_list) {
    //         this.props.getGroupMembers(nextProps.group);
    //         //this.setState({ members_list: this.props.members_list })
    //     //}
    // }

    handleSuggestionClick = (member) => {
        document.getElementById('add-member').reset();
        this.props.addMember(member, this.props.group);
        document.getElementById('suggestion-dropdown').style.display = "none";
    }

    handleClick = (room_type) => {
        this.props.room_type(room_type);
    }

    render() {
        return (
            <div>
                <form id="add-member" onSubmit={this.handleSubmit}>
                    <div className="form-group p-3 mb-0">
                        <input autoComplete="off" type="text" className="form-control"  id="new_member" onChange={this.handleChange} placeholder="Type to add members..." />
                    </div>
                    { (this.props.suggestions) ? (
                        <div className="user-suggest-container add-more-members" id="suggestion-dropdown">
                            { this.props.suggestions.map(r => (
                                <div className='user-result' onClick={() => this.handleSuggestionClick(r.username)} key={r.id}> { r.username } </div>
                            ))}
                        </div>
                    ) : (<span></span>) }
                </form>
                <div className="group-member-list">
                    {
                        (this.props.members_list.length > 0) ? (
                            <div>
                                <div className="group-member-list-header  pl-3 font-weight-bold">Members ({ this.props.members_list.length })</div>
                                <div className="sidebar-list">
                                    <div className="list-group">
                                        {
                                            this.props.members_list && this.props.members_list.map(member => (
                                                <NavLink key={'member_' + member} onClick={() => this.handleClick('chat')} to={ '/chat/' + member + '/' }  className="list-group-item list-group-item-action" >{ member }</NavLink>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p align="center"><small className="text-white align-center">There are no members in the group.</small></p>
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMember: (user, group) => dispatch(addMember(user, group)),
        getGroupMembers: (group) => dispatch(getGroupMembers(group)),
        getUserSuggestions: (keyword) => dispatch(getUserSuggestions(keyword))
    }
}

const mapStateToProps = (state) => {
    return {
        members_list: state.group.members_list,
        suggestions: state.chat.suggestions
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMoreMembers)
