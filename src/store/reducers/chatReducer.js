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
    return state;
}

export default chatReducer