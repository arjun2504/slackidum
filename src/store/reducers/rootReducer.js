import authReducer from './authReducer';
import chatReducer from './chatReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer
})

export default rootReducer