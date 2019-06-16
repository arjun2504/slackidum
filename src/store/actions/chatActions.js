import axios from 'axios';
import history from '../../history';
import { DJANGO_ENDPOINT } from '../../constants'

export const getUserSuggestions = (keyword, exclusions) => {
    return (dispatch, getState) => {

        (keyword.length > 0) ? 
        axios.get(DJANGO_ENDPOINT + 'user/', {
                params: {
                    search: keyword
                },
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem('token')
                } })
            .then(res => {

                if(typeof exclusions !== 'undefined' && exclusions.length === 0)
                    dispatch({
                        type: 'SUGGEST_USERS',
                        suggestions: res.data.results,
                        exclusions: []
                    })
                else 
                    dispatch({
                        type: 'SUGGEST_USERS',
                        suggestions: res.data.results,
                        exclusions: exclusions
                    })
            }).catch(e => {
                (e.response && e.response.status === 403) ? history.push('/logout') : console.log(e.message)
            }) : dispatch({ type: 'SUGGEST_USERS', suggestions: [] }) 
    }
}

export const addToContacts = (queue) => {
    return (dispatch) => {
        var user_ids = queue.map(item => item.id);
        axios.post(DJANGO_ENDPOINT + 'add-contact/', 
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

export const getUserContacts = (contact_list) => {
    return (dispatch) => {
        axios.get(DJANGO_ENDPOINT + 'current-user/', {
            params: { type: 'user_contacts' },
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
        }).then(res => {
            dispatch({
                type: 'GET_USER_CONTACTS',
                contacts: res.data,
                old_contacts: (contact_list) ? contact_list : []
            });
        }).catch(e => {
            (e.response && e.response.status === 403) ? history.push('/logout') : console.log(e);
        });
    }
}