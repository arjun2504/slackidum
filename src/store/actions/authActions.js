import axios from 'axios';
import history from '../../history';

export const registerUser = (user) => {
    return (dispatch, getState) => {
        axios.post(`http://localhost:8000/api/user/`, {
            username: user.username,
            password: user.password
        }).then(res => {
            dispatch(authenticateUser(user));
        }).catch(e => {
            dispatch({
                type: 'REGISTER_USER',
                register_message: (e.response.data.username ? e.response.data.username[0] : '') + ' ' +  (e.response.data.password ? e.response.data.password[0] : '')
            });
        });
    }
}

export const authenticateUser = (credentials) => {
    return (dispatch, getState) => {
        
        axios.post(`http://localhost:8000/api/auth/`, { 
                username: credentials.username, password: credentials.password 
            })
            .then(res => {
                
                if(res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    dispatch(history.push('/chat'));
                }
                    
            }).catch(e => {
                dispatch({
                    type: 'AUTHENTICATE_USER',
                    is_logged_in: false,
                    login_message: (e.response && e.response.data.non_field_errors) ? (e.response.data.non_field_errors) : '' 
                });
            });

    }
}

export const checkAvailability = (registration_data) => {
    return (dispatch, getState) => {
        
        axios.post(`http://localhost:8000/api/username/check/`, { username: registration_data.username })
            .then(res => {
                dispatch({
                    type: 'CHECK_USERNAME_AVAILABILITY',
                    is_username_available: res.data.message
                })
            });
    }
}

export const checkIfTokenPresent = () => {
    return (dispatch) => {
        if(localStorage.getItem('token') !== null) {
            dispatch({
                type: 'IS_TOKEN_PRESENT',
                is_logged_in: true
            })
        } else {
            dispatch({
                type: 'IS_TOKEN_PRESENT',
                is_logged_in: false
            })
        }
    }
}