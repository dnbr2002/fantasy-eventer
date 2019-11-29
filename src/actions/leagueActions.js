import * as types from './actionTypes';
import { firebaseDb } from '../firebase';
// import _ from 'lodash';
import values from 'lodash/values'

export function loadLeague() {
  const ref = firebaseDb.ref('users');
  return dispatch => {
    ref.once('value').then(snapshot => {
      console.log("VALUES::", values(snapshot.val()))
      return values(snapshot.val())       
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


