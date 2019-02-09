import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { signUpReducer } from './signUpReducer';
import { notificationReducer } from './notificationReducer';
import { tasksReducer } from './tasksReducer';
import { adminReducer } from './adminReducer';
import { teamReducer } from './teamReducer';
import { teamNameReducer } from './teamNameReducer';
import { competitionReducer } from './competitionReducer';
import { profileReducer } from './profileReducer';
import { leagueReducer } from './leagueReducer';

export default combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  routing: routerReducer,
  tasks: tasksReducer,
  competitors: adminReducer,
  competition: competitionReducer,
  team: teamReducer,
  teamName: teamNameReducer,
  signUp: signUpReducer,
  profile: profileReducer,
  league: leagueReducer
});
