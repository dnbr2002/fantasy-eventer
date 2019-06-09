import { createSelector } from 'reselect';
import _ from 'lodash';

var data = [];
var ldata = [];

export function getLeague(state) {
  if (state.league) {
    console.log("LSELECT::", state.league);
    return state.league;
  }
}

function transform(UserRecord)
{
  const outerObj = UserRecord[Object.keys(UserRecord)[0]];
  data.push(outerObj);
  return data  
}

export function getSortedLeague(state) {
  if (state.length > 1) {
    console.log("LSELECT5::", state)
    state.map(x => transform(x));
  console.log("LSELECT2::",data);
  return data;
}
else 
return data;

}
export function getLeagueList(state) {  

}




//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const LeagueSelector = createSelector(
  getLeague,
  getSortedLeague
  // getLeagueList,
);
