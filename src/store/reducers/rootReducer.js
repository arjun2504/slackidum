import authReducer from './authReducer';
import chatReducer from './chatReducer';
import msgReducer from './msgReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    msg: msgReducer
})

export default rootReducer