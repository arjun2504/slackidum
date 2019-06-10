const initState = {
    name: '',
    email: '',
    password: '',
    password2: ''
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'REGISTER_USER':
            console.log('registered user', action.user);
            break;
        case 'AUTHENTICATE_USER':
            console.log('authenticating user', action.user);
            break;
    }
    return state;
}

export default authReducer