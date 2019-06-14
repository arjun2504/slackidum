import authReducer from './authReducer';
import chatReducer from './chatReducer';
import msgReducer from './msgReducer';
import groupReducer from './groupReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    msg: msgReducer,
    group: groupReducer
})

export default rootReducer