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

export function getRankedLeague(state) {
  console.log("HERE0::",state);
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const LeagueSelector = createSelector(
  getLeague, 
  getRankedLeague,
);
