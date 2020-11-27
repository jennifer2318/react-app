import { combineReducers } from 'redux';
import loginReducer from "./loginReducer";
import messageBarReducer from "./messageBarReducer";

export default combineReducers({
    login: loginReducer,
    messageBar: messageBarReducer,
});