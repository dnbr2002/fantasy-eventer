import { createSelector } from 'reselect';
import _ from 'lodash';

var data = [];

export function getLeague(state) {
  if (state.league) {
    return state.league;
  }
}

function transform(UserRecord) {
  const outerObj = UserRecord[Object.keys(UserRecord)[0]];
  data.push(outerObj);
  return data
}

export function getSortedLeague(state) {
  if (state.length > 1) {
    state.map(x => transform(x));
    return data;
  }
  else
    return data;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const LeagueSelector = createSelector(
  getLeague,
  getSortedLeague
);
