import { FirebaseList } from 'firebase/index.js';
import * as taskActions from '../actions/taskActions';
import { Task } from './task';


export const taskList = new FirebaseList({
  onAdd: taskActions.createTaskSuccess,
  onChange: taskActions.updateTaskSuccess,
  onLoad: taskActions.loadTasksSuccess,
  onRemove: taskActions.removeTaskSuccess
}, Task);
