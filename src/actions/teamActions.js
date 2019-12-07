import * as types from './actionTypes';
import { Record } from 'immutable';
import { FirebaseList } from 'src/firebase';

export const Team = new Record({
  key: null,
  profileName: null,
  profilePic: null,
  teamName: null, 
  score: 0,
  teamKeysTier1: null,
  teamKeysTier2: null
});

export const teamFireDB = new FirebaseList({
  // onAdd: createTeammateSuccess,
  onChange: updateTeammateSuccess,
  onLoad: loadTeamSuccess,
  onRemove: removeTeammateSuccess
}, Team);


export function pickTeam(selected) {
  return {
    type: types.PICK_TEAM,
    payload: selected
  }
}

export function loadTeam() {
  return (dispatch, getState) => {
    const { auth } = getState();
    teamFireDB.path = `users/${auth.id}`;
    teamFireDB.subscribe(dispatch);
  };
}

export function loadTeamLeague(authId) {
  return (dispatch) => {
    teamFireDB.path = `users/${authId}`;
    teamFireDB.subscribe(dispatch);
  };
}



export function loadTeamSuccess(team) {
  // console.log("TEAM::",team);
  return {
    type: types.LOAD_TEAM_SUCCESS,
    payload: team
  };
}

export function loadTeamError(error) {
  return {
    type: types.LOAD_TEAM_ERROR,
    payload: error
  };
}

export function updateTeam(changes) {
  // console.log("UPDATETEAM::",changes)
  return (dispatch, getState) => {
    const { auth } = getState();
    teamFireDB.update(auth.id, changes)
      .catch(error => dispatch(updateTeammateError(error)));
  };
}

export function updateTeammateSuccess(team) {
  // console.log("UPDATETEAMSUCCESS::",team)
  return {
    type: types.UPDATE_TEAMMATE_SUCCESS,
    payload: team
  };
}

export function updateTeammateError(error) {
  // console.log("UPDATETEAMERRROR::",error)
  return {
    type: types.UPDATE_TEAMMATE_ERROR,
    payload: error
  };
}


export function filterTeam(filterType) {
  return {
    type: types.FILTER_TEAM,
    payload: { filterType }
  };
}


export function removeTeammate(teamKey) {
  return dispatch => {
    teamFireDB.remove(teamKey)
      .catch(error => dispatch(removeTeammateError(error)));
  };
}



export function removeTeammateSuccess(team) {
  return {
    type: types.REMOVE_TEAMMATE_SUCCESS,
    payload: team
  };
}

export function removeTeammateError(error) {
  return {
    type: types.REMOVE_TEAMMATE_ERROR,
    payload: error
  };
}


// export function createTeammate(key) {
//   var teamKeys = key
//   return (dispatch, getState) => {
//     const { auth } = getState();
//     teamFireDB.path = `users/${auth.id}/`;
//       teamFireDB.setNoKey({ teamKeys })
//         .catch(error => dispatch(createTeammateError(error)));
//   };
// }


// export function createTeammateSuccess(team) {
//   return {
//     type: types.CREATE_TEAMMATE_SUCCESS,
//     payload: team
//   };
// }


// export function createTeammateError(error) {
//   return {
//     type: types.CREATE_TEAMMATE_ERROR,
//     payload: error
//   };
// }


