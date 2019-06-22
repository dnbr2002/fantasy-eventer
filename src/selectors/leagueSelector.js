import { createSelector } from 'reselect';
import _ from 'lodash';

var data = [];

export function getLeague(state) {
  if (state) {
    return state
  }
}

function transform(UserRecord) {
  const outerObj = UserRecord[Object.keys(UserRecord)[0]];
  data.push(outerObj);
  return data
}

export function getSortedLeague(state) {
  console.log("HERE0::",state);
  // if (state.length > 1) {
    state.map(x => transform(x));
    console.log("HERE1::",data);
    return data;
  // }
  // else
  // console.log("HERE2::",data);
  //   return data;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const LeagueSelector = createSelector(
  [getLeague, getSortedLeague],

);
