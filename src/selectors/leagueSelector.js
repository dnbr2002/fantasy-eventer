import { createSelector } from 'reselect';
import { Record, Map } from 'immutable';

// var ProfileRecord = Record({
//   key: null,
//   profileName: '',
//   profilePic: '',
//   score: '',
//   teamKeysTier1: '',
//   teamKeysTier2: '',
//   teamName: ''
// });

// var teamRecord = Record({
//   competitorKey: ''
// });

// class User extends Record({ 'profile': new ProfileRecord(), 'team': Map() }) {
//   constructor({ profile, team } = {}) {
//     super({ team: Map(team).map(x => new teamRecord(x)), profile: new ProfileRecord(profile) })
//   }
// }

// export function getLeague(state) {
//   if (state.league) {
//     console.log("STATELEAGEVALUE::", state.league)
//     return state
//   }
// }

// export function getLeagueList(state) {
//   return Map(state.league.list).map(x => new User(x));
// }

export function getLeague(state) {
  if (state) {
    console.log("LSELECT::", state);
    return state;
  }
}

export function getLeagueList(state) {
  if (getLeague(state).league.list.size > 0) {
    console.log("SELECTA_List::", state)
    return getLeague(state).list;
  }
}




//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const LeagueSelector = createSelector(
  getLeague,
  getLeagueList,
);
