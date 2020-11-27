import { combineReducers } from 'redux';
import loginReducer from "./loginReducer";
import messageBarReducer from "./messageBarReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
    login: loginReducer,
    messageBar: messageBarReducer,
    usersList: usersReducer,
});