import axios from 'axios';

export const registerUser = (user) => {
    return (dispatch, getState) => {
        //make async call to db 
        dispatch({
            type: 'REGISTER_USER',
            user
        });
    }
}

export const authenticateUser = (user) => {
    return (dispatch, getState) => {
        //make async call to db 
        dispatch({
            type: 'AUTHENTICATE_USER',
            user
        });
    }
}

export const checkAvailability = (registration_data) => {
    return (dispatch, getState) => {
        
        axios.post(`http://localhost:8000/api/username/check/`, { username: registration_data.username })
            .then(res => {
                dispatch({
                    type: 'CHECK_USERNAME_AVAILABILITY',
                    username_available: res.data.message
                })
            });
    }
}