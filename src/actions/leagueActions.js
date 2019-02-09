import * as types from './actionTypes';
import { Record } from 'immutable'; //, Map, List 
import { FirebaseList } from 'src/firebase';

export const League = new Record({
})

export const leagueFireDB = new FirebaseList({
  onLoad: loadLeagueSuccess,
},League);

export function loadLeague() {
  console.log("LOADLEAGUE::");
  return dispatch => {
    leagueFireDB.path = `users/`;
    leagueFireDB.subscribeOnceKv(dispatch);
  };
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
