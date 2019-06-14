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
            return { ...state, suggestions: action.suggestions }
        case 'ADD_TO_CONTACTS':
            return { ...state, add_contacts_message: action.add_contacts_message }
        case 'CREATE_GROUP':
            return { ...state, create_group_message: action.create_group_message }
        case 'GET_USER_GROUPS':
            return { ...state, groups: action.groups }
        case 'GET_USER_CONTACTS':
            return { ...state, contacts: action.contacts }
        default:
            return state;
    }
}



export default chatReducer