import * as types from './actionTypes';
import { Record } from 'immutable';
import { FirebaseList } from 'src/firebase';

export const CompInfo = new Record({
  name: null,
  desc: null,
  location: null,
  date: null,
  pic: null,
  key: null,
  active: null
});

export const compFireDB = new FirebaseList({
  onAdd: createCompetitionSuccess,
  onChange: updateCompetitionSuccess,
  onLoad: loadCompetitionSuccess,
  onRemove: removeCompetitionSuccess
}, CompInfo);


export function loadCompetition() {
  return dispatch => {
    compFireDB.path = `competition/`;
    compFireDB.subscribe(dispatch);
  };
}


export function loadCompetitionSuccess(competition) {
  // console.log("TEAMNAMElOAD::",teamName);
  return {
    type: types.LOAD_COMPETITION_SUCCESS,
    payload: competition
  };
}

export function loadCompetitionError(error) {
  return {
    type: types.LOAD_COMPETITION_ERROR,
    payload: error
  };
}

export function createCompetition(competition) {
  // console.log("TEAMNAME::",teamName);
  var active = competition.active
  var date = competition.date
  var desc = competition.desc
  var location = competition.location
  var name = competition.name
  var pic = competition.pic
return dispatch => {
    compFireDB.path = `competition/`;
    compFireDB.push({ active, date, desc, location, name, pic })
        .catch(error => dispatch(createCompetitionError(error)));
  };
}

export function createCompetitionSuccess(competition) {
  // console.log("TEAMNAMESUCCESS::",teamName);
  return {
    type: types.CREATE_COMPETITION_SUCCESS,
    payload: competition
  };
}


export function createCompetitionError(error) {
  // console.log("ACTION_CREATETEAMSTARTERROR::", error)
  return {
    type: types.CREATE_COMPETITION_ERROR,
    payload: error
  };
}


export function updateCompetition(competitionKey, changes) {
  return dispatch => {
    compFireDB.update(competitionKey, changes)
      .catch(error => dispatch(updateCompetitionError(error)));
  };
}

export function updateCompetitionSuccess(competition) {
  return {
    type: types.UPDATE_COMPETITION_SUCCESS,
    payload: competition
  };
}

export function updateCompetitionError(error) {
  return {
    type: types.UPDATE_COMPETITION_ERROR,
    payload: error
  };
}


export function removeCompetition(competitionKey) {
  console.log('REMOVETEAMKEY::', competitionKey)
  return dispatch => {
    compFireDB.remove(competitionKey)
      .catch(error => dispatch(removeCompetitionError(error)));
  };
}



export function removeCompetitionSuccess(competition) {
  console.log('REMOVETEAMKEY::', competition)
  return {
    type: types.REMOVE_COMPETITION_SUCCESS,
    payload: competition
  };
}

export function removeCompetitionError(error) {
  console.log('REMOVETEAMERROR::', error)
  return {
    type: types.REMOVE_COMPETITION_ERROR,
    payload: error
  };
}

// export function getCompetitionStatus() {
//   return dispatch => {
//     const ref = compFireDB.ref('competitionStatus');
//     ref.once('value').then(snapshot => {
//       snapshot.val();
//     }).then(payload => dispatch(getCompetitonStatusSuccess(payload)))
//       .catch(error => dispatch(getCompetitonStatusError(error)));
//   }
// }


// export function getCompetitonStatusSuccess(status) {
//   console.log('GETCOMPETITORSUCCESS::', status)
//   return {
//     type: types.GET_COMPETITION_STATUS_SUCCESS,
//     payload: status
//   };
// }

// export function getCompetitonStatusError(error) {
//   // console.log('REMOVECOMPETITORERROR::', error)
//   return {
//     type: types.GET_COMPETITION_STATUS_ERROR,
//     payload: error
//   };
// }