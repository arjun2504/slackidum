const initState = {
    username: '',
    password: '',
    password2: '',
    is_username_available: null,
    is_logged_in: (localStorage.getItem('token') !== null) ? true : false,
    login_message: '',
    register_message: '',
    user_id: null
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'REGISTER_USER':
            return { ...state, user_id: action.user_id, register_message: action.register_message }
        case 'AUTHENTICATE_USER':
            return { ...state, is_logged_in: action.is_logged_in, login_message: action.login_message }
        case 'CHECK_USERNAME_AVAILABILITY':
            return { ...state, is_username_available: action.is_username_available };
        case 'IS_TOKEN_PRESENT':
            return { ...state, is_logged_in: action.is_logged_in };
        default:
            return state;
    }
}

export default authReducer