import { combineReducers } from "redux";
import tasks from "./tasksReducer";
import ui from "./uiReducer";

export default combineReducers({ tasks, ui });
