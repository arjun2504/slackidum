const initState = {
    contacts: [
        { id: 1, username: 'arjun' },
        { id: 2, username: 'john' },
        { id: 3, username: 'doe' },
    ],
    groups: [
        { id: 1, group: 'entertainment'},
        { id: 2, group: 'education'},
    ],
}

const chatReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SUGGEST_USERS':
            return { ...state, suggestions: action.suggestions };
            break;
        case 'ADD_TO_CONTACTS':
            console.log(action.queue);
            return { ...state, queue: action.queue };
            break;
        case 'CREATE_GROUP':
            return { ...state, create_group_message: action.create_group_message };
            break;
        case 'GET_USER_GROUPS':
            return { ...state, groups: action.groups };
            break;
        default:
            return state;
    }
    return state;
}



export default chatReducer