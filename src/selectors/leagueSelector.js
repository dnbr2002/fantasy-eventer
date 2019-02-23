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


export function getLeague(state) {
  if (state) {
    console.log("LSELECT::", state);
    return state;
  }
}

// export function getLeagueList(state) {
//   console.log("XX::", state.league.list);
//   var thing = Map(state.league.list).map(x =>  
//     console.log("XXX::", x)
//     // new User(x)
//     );
//   console.log("THING::",thing)
//   return thing;
// }
export function getSortedLeague(state) {
  if (state.league.length > 0) {
    var sorted = state.league.sort((a, b) => parseFloat(a.VpZzuZcf1ENLCm1muzGHgPzvEtQ2.score) - parseFloat(b.FIXBObMxXoOzFE7hsb4wHl8esfe2.score)
    // console.log("ASORT::",a.VpZzuZcf1ENLCm1muzGHgPzvEtQ2.score) + console.log("BSORT::",b.FIXBObMxXoOzFE7hsb4wHl8esfe2.score)

    )
    console.log("LSELECT2::", sorted);
  }

}
export function getLeagueList(state) {
  // getLeague(state).league.forEach(ss => {
  //   var data = []
  //   console.log("DATA::",data.push(ss.child('name').val()));
  // });
}




//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const LeagueSelector = createSelector(
  getLeague,
  getSortedLeague
  // getLeagueList,
);
