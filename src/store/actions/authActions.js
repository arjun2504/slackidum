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