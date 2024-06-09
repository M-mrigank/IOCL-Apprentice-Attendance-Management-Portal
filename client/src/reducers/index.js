import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import apprenticeRecordReducer from "./apprenticeRecord";

export default combineReducers({
    authReducer, currentUserReducer, apprenticeRecordReducer
});