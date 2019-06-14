const initState = {
    room_name: null,
    message: '',
    chat_thread: [],
    from_user: null,
    next_page: null,
    room_type: 'chat'
}

const chatReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CONNECT_TO_ROOM':
            return { ...state, room_name: action.room_name }
        case 'SEND_MESSAGE':
            return { ...state, message: action.message }
        case 'MESSAGE_RECEIVED':
            var current_time = new Date();
            var thread = { message: action.data.message,
                            room_name: action.data.room_name,
                            from_user: action.data.from_user,
                            timestamp: current_time
                        }
            console.log(thread);
            if(typeof thread.message !== 'undefined')
                return { ...state, room_name: action.data.room_name, chat_thread: state.chat_thread.concat(thread) };
            return state;
        case 'DISCONNECT_ROOM':
            return { ...state, chat_thread: [] }
        case 'PRELOAD_MESSAGES':
            
            var thread = action.data.results.map(function(t, i) {
                var timestamp = new Date(t.created_at);
                return {
                    message: t.message,
                    room_name: t.chat_room,
                    from_user: t.user_id.username,
                    timestamp: timestamp
            }});
            
            return { ...state, room_name: action.data.room_name, chat_thread: (action.data.prepend) ? thread.concat(state.chat_thread) : thread, next_page: action.data.next_page }
        default:
            return state;
    }
}

export default chatReducer