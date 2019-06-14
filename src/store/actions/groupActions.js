import axios from 'axios';
import history from '../../history';

export const addMember = (user, group) => {
    return (dispatch) => {
        axios.post('http://localhost:8000/api/group/' + group + '/add-user/',
                    { user_ids: [ user ] },
                    { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
            }).then(res => {
                dispatch({
                    type: 'ADD_MEMBER_TO_GROUP',
                    data: { user, group }
                });
            }).catch(e => {
                (e.response && e.response.status === 403) ? history.push('/logout') : console.log(e);
            })
    }
}

export const getGroupMembers = (group) => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/members/' + group + '/', {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
        }).then(res => {
            dispatch({
                type: 'GET_MEMBERS',
                members_list: res.data.members_list.reverse()
            })
        }).catch(e => {
            (e.response && e.response.status === 403) ? history.push('/logout') : console.log(e);
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
            (e.response && e.response.status === 403) ? history.push('/logout') : dispatch({
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
            (e.response && e.response.status === 403) ? history.push('/logout') : console.log(e);
        });
    }
}