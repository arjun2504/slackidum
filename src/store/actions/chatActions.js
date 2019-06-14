import axios from 'axios';
import history from '../../history';

export const getUserSuggestions = (keyword) => {
    return (dispatch, getState) => {

        (keyword.length > 1) ? 
        axios.get('http://localhost:8000/api/user/', {
                params: {
                    search: keyword
                },
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem('token')
                } })
            .then(res => {
                dispatch({
                    type: 'SUGGEST_USERS',
                    suggestions: res.data.results
                })
            }).catch(e => {
                (e.response.status === 403) ? history.push('/logout') : console.log(e.message)
            }) : dispatch({ type: 'SUGGEST_USERS', suggestions: [] }) 
    }
}

export const addToContacts = (queue) => {
    return (dispatch) => {
        var user_ids = queue.map(item => item.id);
        axios.post('http://localhost:8000/api/add-contact/', 
                { user_ids: user_ids },
                { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
        }).then(res => {
            if(res.data.created && res.data.created === user_ids.length){
                dispatch({
                    type: 'ADD_TO_CONTACTS',
                    add_contacts_message: ''
                });
                history.push('/chat/' + queue[0].username);
            } else {
                dispatch({
                    type: 'ADD_TO_CONTACTS',
                    add_contacts_message: (queue.length === 0) ? 'Please choose at least one contact.' : 'Something went wrong.'
                });
            }
        }).catch(e => {
            (e.response.status === 403) ? history.push('/logout') : dispatch({
                type: 'ADD_TO_CONTACTS',
                create_group_message: 'Something went wrong.'
            })
        })
    }
}

export const createGroup = (queue, group_name) => {
    return (dispatch) => {
        var user_ids = queue.map(item => item.id);
        axios.post('http://localhost:8000/api/group/create/',
                    { user_ids: user_ids, name: group_name },
                    { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
        }).then(res => {
            if(res.data.message){
                dispatch({
                    type: 'CREATE_GROUP',
                    create_group_message: ''
                });
                history.push('/group/' + group_name);
            }
            else
                dispatch({
                    type: 'CREATE_GROUP',
                    create_group_message: 'Group name already exists or some other error occurred.'
                })
        }).catch(e => {
            (e.response.status === 403) ? history.push('/logout') : dispatch({
                type: 'CREATE_GROUP',
                create_group_message: 'Group name already exists or some other error occurred.'
            })
        })
    }
}

export const getUserGroups = () => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/current-user/', {
            params: { type: 'user_groups' },
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
        }).then(res => {
            dispatch({
                type: 'GET_USER_GROUPS',
                groups: res.data
            })
        }).catch(e => {
            (e.response.status === 403) ? history.push('/logout') : console.log(e);
        });
    }
}

export const getUserContacts = () => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/current-user/', {
            params: { type: 'user_contacts' },
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
        }).then(res => {
            dispatch({
                type: 'GET_USER_CONTACTS',
                contacts: res.data
            })
        }).catch(e => {
            (e.response.status === 403) ? history.push('/logout') : console.log(e);
        });
    }
}