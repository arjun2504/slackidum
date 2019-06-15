const initState = {
    contacts: [],
    members_list: [],
    add_contacts_message: ''
}

function sortBy(key, data) {
	return data.sort((a, b) => {
		var x = parseInt(a[key]); 
		var y = parseInt(b[key]);
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	});
}

const chatReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SUGGEST_USERS':
            var final_suggestions = action.suggestions.filter(s => (s.username !== localStorage.username) || (!action.exclusions.includes(s.username)));
            return { ...state, suggestions: final_suggestions }
        case 'ADD_TO_CONTACTS':
            return { ...state, add_contacts_message: action.add_contacts_message }
        case 'GET_USER_CONTACTS':
            return { ...state, contacts: action.contacts }
        case 'REFRESH_PRESENCE_STATUS':
            for(var i=0; i<state.contacts.length; i++) {
                if(state.contacts[i].username === action.contacts.user) {
                    state.contacts[i].is_online = (action.contacts.type === 'online') ? true : false
                }
            }
            var sorted = sortBy('is_online', state.contacts);
            return { ...state, contacts: sorted }
        default:
            return state;
    }
}



export default chatReducer