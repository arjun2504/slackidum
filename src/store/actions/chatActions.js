import axios from 'axios';
import history from '../../history';
import { ifError } from 'assert';

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
                (e.response.status == 403) ? history.push('/logout') : console.log(e.message)
            }) : dispatch({ type: 'SUGGEST_USERS', suggestions: [] }) 
    }
}

export const addToContacts = (queue) => {
    return (dispatch) => {
        history.goBack();
        dispatch({
            type: 'ADD_TO_CONTACTS',
            queue
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
            (e.response.status == 403) ? history.push('/logout') : dispatch({
                type: 'CREATE_GROUP',
                create_group_message: 'Group name already exists or some other error occurred.'
            })
        })
    }
}

export const getUserGroups = () => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/current-user/?type=user_groups', {
            params: { type: 'user_groups' },
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
        }).then(res => {
            dispatch({
                type: 'GET_USER_GROUPS',
                groups: res.data
            })
        }).catch(e => {
            (e.response.status == 403) ? history.push('/logout') : console.log(e);
        });
    }
}