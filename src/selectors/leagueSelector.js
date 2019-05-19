import { createSelector } from 'reselect';
import { Record, Map, fromJS, List } from 'immutable';
import { from } from 'rxjs';
import _ from 'lodash';

const data = [];

export function getLeague(state) {
  if (state) {
    console.log("LSELECT::", state);
    return state;
  }
}

function transform(UserRecord)
{
  const outerObj = UserRecord[Object.keys(UserRecord)[0]];
  const item = outerObj[Object.keys(outerObj)[0]];
  data.push(outerObj);
}

export function getSortedLeague(state) {
  var league2 = from(state.league)
  var subscribeLeague = league2.subscribe(val => transform(val));
  console.log("TRANSFORM4::", data);
  return data;
}
export function getLeagueList(state) {  
  const ll = List.of(data);
  console.log("LL::",ll);
  ll.sort(
    (a,b) => parseFloat(a.get('score')) - parseFloat(b.get('score'))
  )
  console.log("LL2::",ll);
  return ll;
}




//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const LeagueSelector = createSelector(
  getLeague,
  getSortedLeague,
  getLeagueList,
);
