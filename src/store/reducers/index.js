import { combineReducers } from "redux";
import user from '../reducers/user';
import tasks from '../reducers/tasks';

export default () => 
   combineReducers({
      user,
      tasks,
   });
