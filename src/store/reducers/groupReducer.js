const initState = {
    groups: [
        { id: 1, group: 'entertainment'},
        { id: 2, group: 'education'},
    ],
    members_list: [],
}

const groupReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CREATE_GROUP':
            return { ...state, create_group_message: action.create_group_message }
        case 'GET_USER_GROUPS':
            return { ...state, groups: action.groups }
        case 'ADD_MEMBER_TO_GROUP':
            return { ...state, members_list: state.members_list.unshift(action.data.user) }
        case 'GET_MEMBERS':
            return { ...state, members_list: action.members_list }
        default:
            return state;
    }
}



export default groupReducer