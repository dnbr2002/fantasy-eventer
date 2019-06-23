import * as types from './actionTypes';
import { Record, List, Map, fromJS } from 'immutable'; //, Map, List 
import { FirebaseList } from 'src/firebase';
import { firebaseDb } from '../firebase';
import _ from 'lodash';

// export const League = new Record({
//   Users: new Map()
// })

// export const leagueFireDB = new FirebaseList({
//   onLoad: loadLeagueSuccess,
// }, League);

// export function loadLeague() {
//   console.log("LOADLEAGUE::");
//   return dispatch => {
//     leagueFireDB.path = `users/`;
//     leagueFireDB.subscribe(dispatch);
//   };
// }

var league = []



export function loadLeague() {
  const ref = firebaseDb.ref('users');
  return dispatch => {
    ref.once('value').then(snapshot => {
      console.log("VALUES::",_.values(snapshot.val()))
      return _.values(snapshot.val())       
    }).then(snapshot => {
        dispatch(loadLeagueSuccess(snapshot));
      }).catch((error) => {
        dispatch(loadLeagueError(error));
      })
  }
}


export function loadLeagueSuccess(league) {
  console.log("LEAGUElOADSuccess::", league);
  return {
    type: types.LOAD_LEAGUE_SUCCESS,
    payload: league
  };
}

export function loadLeagueError(error) {
  console.log("LEAGUElOADError::", error);
  return {
    type: types.LOAD_LEAGUE_ERROR,
    payload: error
  };
}


