const initState = {
    username: '',
    password: '',
    password2: '',
    is_username_available: null
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'REGISTER_USER':
            console.log('registered user', action.user);
            break;
        case 'AUTHENTICATE_USER':
            console.log('authenticating user', action.user);
            break;
        case 'CHECK_USERNAME_AVAILABILITY':
            console.log(action.username_available);
            return { ...state, username_available: action.username_available };
            break;
        default:
            return state;
    }
    return state;
}

export default authReducer