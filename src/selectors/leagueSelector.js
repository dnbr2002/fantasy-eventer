import { createSelector } from 'reselect';
import { Record, Map } from 'immutable';

// var ProfileRecord = Record({
//   profileName: '',
//   profilePic: '',
//   teamName: '',
//   score: ''
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
//   console.log("STATELEAGEVALUE::",state.league.teams)
//   return state
// }

// export function getLeagueList(state) {
//   return Map(state.league.teams).map(x => new User(x));
// }

export function getLeague(state) {
  console.log("LSELECT::",state);
  return state;
}

export function getLeagueList(state) {
  // console.log("SELECTA_List::",state)

  return getLeague(state).list;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const LeagueSelector = createSelector(
  getLeague,
  // getLeagueList,
);
