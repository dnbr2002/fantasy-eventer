import * as types from './actionTypes';
import { Record } from 'immutable';
import { FirebaseList } from 'src/firebase';

export const TeamName = new Record({
  teamName: null,
  key: null
});

export const teamFireDB = new FirebaseList({
  onAdd: createTeamNameSuccess,
  onChange: updateTeamNameSuccess,
  onLoad: loadTeamNameSuccess
  //onRemove: removeTeamNameSuccess
}, TeamName);


export function loadTeamName() {
  return (dispatch, getState) => {
    const { auth } = getState();
    teamFireDB.path = `users/${auth.id}/teamName/`;
    teamFireDB.subscribe(dispatch);
  };
}


export function loadTeamNameSuccess(teamName) {
  // console.log("TEAMNAMElOAD::",teamName);
  return {
    type: types.LOAD_TEAM_NAME_SUCCESS,
    payload: teamName
  };
}

export function loadTeamNameError(error) {
  return {
    type: types.LOAD_TEAM_NAME_ERROR,
    payload: error
  };
}

export function createTeamName(teamName) {
  // console.log("TEAMNAME::",teamName);

  return (dispatch, getState) => {
    const { auth } = getState();
    teamFireDB.path = `users/${auth.id}/teamName/`;
      teamFireDB.push({ teamName })
        .catch(error => dispatch(createTeamNameError(error)));
  };
}

export function createTeamNameSuccess(teamName) {
  // console.log("TEAMNAMESUCCESS::",teamName);
  return {
    type: types.CREATE_TEAM_NAME_SUCCESS,
    payload: teamName
  };
}


export function createTeamNameError(error) {
  // console.log("ACTION_CREATETEAMSTARTERROR::", error)
  return {
    type: types.CREATE_TEAM_NAME_ERROR,
    payload: error
  };
}


export function updateTeamName(teamNameKey, changes) {
  console.log('UPATETEAMNAME::', teamNameKey+'----'+changes);
  return dispatch => {
    teamFireDB.update(teamNameKey.key, changes)
      .catch(error => dispatch(updateTeamNameError(error)));
  };
}

export function updateTeamNameSuccess(teamName) {
  console.log('UPATETEAMNAMESuccess::', teamName);
  return {
    type: types.UPDATE_TEAM_NAME_SUCCESS,
    payload: teamName
  };
}

export function updateTeamNameError(error) {
  console.log('UPATETEAMNAMEError::', error);
  return {
    type: types.UPDATE_TEAM_NAME_ERROR,
    payload: error
  };
}


// export function removeTeam(teamKey) {
//   console.log('REMOVETEAMKEY::', teamKey)
//   return dispatch => {
//     teamFireDB.remove(teamKey)
//       .catch(error => dispatch(removeTeamError(error)));
//   };
// }



// export function removeTeamSuccess(team) {
//   console.log('REMOVETEAMKEY::', team)
//   return {
//     type: types.REMOVE_TEAM_SUCCESS,
//     payload: team
//   };
// }

// export function removeTeamError(error) {
//   console.log('REMOVETEAMERROR::', error)
//   return {
//     type: types.REMOVE_TEAM_ERROR,
//     payload: error
//   };
// }
