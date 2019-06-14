import axios from 'axios';
import history from '../../history';

var chatSocket = null;

const getRoomName = (user, room_type) => {
    var users = [user, localStorage.username];
    users.sort();
    var room_name = users.join('__');
    return (room_type === 'chat') ? 'chat__' + room_name : 'group__' + user;
}

const getNextPageNumber = (next_page) => {
    var url = new URL(next_page);
    return url.searchParams.get("page");
}

export const connectToRoom = (username, room_type) => {
    return (dispatch, getState) => {
        if(localStorage.token == null)
            history.push('/logout');
        
        

        axios.get('http://localhost:8000/api/current-user/', {
            params: { type: 'self_info' },
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
        }).then(res => {
            console.log(room_type);
            var room_name = getRoomName(username, room_type);

            if(res.data.id) {
                if(chatSocket !== null) {
                    chatSocket.close();
                }
                chatSocket = new WebSocket('ws://localhost:8000/ws/chat/' + room_name + '/' + res.data.username + '/');
        
                chatSocket.onmessage = function(e) {
                    var data = JSON.parse(e.data);
                    dispatch({
                        type: 'MESSAGE_RECEIVED',
                        data: { message: data['message']['message'], room_name: room_name, from_user: data['message']['from_user']},
                    })
                };
            
                chatSocket.onclose = function(e) {
                    console.log('disconnecting chat');
                    dispatch({
                        type: 'CLEAR_MESSAGES'
                    })
                };

                dispatch({
                    type: 'CONNECT_TO_ROOM',
                    room_name
                });
            } else {
                history.push('/logout');
            }
        }).catch(e => {
            history.push('/logout');
        });

    }
}

export const sendMessage = (message, room_name) => {
    return (dispatch) => {
        if(localStorage.token == null)
            history.push('/logout');
        
        if(message !== "") {
            chatSocket.send(JSON.stringify({
                    'data': {
                        'message': message,
                        'room_name': room_name
                    }
            }));

            dispatch({
                type: 'SEND_MESSAGE',
                message
            })
        }
    }
}

export const preLoadMessages = (user, room_type, page_number) => {
    return (dispatch) => {
        var room_name = getRoomName(user, room_type);
        var p = (page_number) ? page_number : 1;
        axios.post('http://localhost:8000/api/get-convo/?page=' + p, 
                { chat_room: room_name },
                { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
        }).then(res => {

            var next_page = null;
            if(res.data.next !== null)
                next_page = getNextPageNumber(res.data.next)

            dispatch({
                type: 'PRELOAD_MESSAGES',
                data: { results: res.data.results.reverse(), room_name: room_name, next_page: next_page, prepend: (p !== 1) ? true : false }
            })
        }).catch(e => {
            (e.response && e.response.status === 403) ? history.push('/logout') : console.log(e.message)
        })
    }
}