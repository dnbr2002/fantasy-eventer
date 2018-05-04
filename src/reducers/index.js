import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { notificationReducer } from './notificationReducer';
import { tasksReducer } from './tasksReducer';
import { adminReducer } from './adminReducer';


export default combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  routing: routerReducer,
  tasks: tasksReducer,
  admin: adminReducer
});
