import { createSelector } from 'reselect';
import { Record, Map, fromJS, List } from 'immutable';
import { from } from 'rxjs';
import _ from 'lodash';

const data = [];
const lData = [];
var list;
var l2Data = [];

export function getLeague(state) {
  if (state) {
    console.log("LSELECT::", state);
    return state;
  }
}

function transform(UserRecord)
{
  const outerObj = UserRecord[Object.keys(UserRecord)[0]];
  list.push(outerObj);
  console.log("LODASH::",list);
  data.push(outerObj);
}

export function getSortedLeague(state) {
  var league2 = from(state.league)
  list = new List();
  var subscribeLeague = league2.subscribe(val => transform(val));
  console.log("TRANSFORM4::", data);
  console.log("LODASH2::",list);
  return data;
}
export function getLeagueList(state) {  
  const ll = List.of(data);
  console.log("LL::",ll);
  // console.log("2".localeCompare("10", undefined, {numeric: true}));
  // console.log("10".localeCompare("2", undefined, {numeric: true}));
  
  console.log("ll2::",ll.sort((a,b) => (a.get('score')).localCompare(b.get('score'), undefined, {numeric: true})));
  // console.log("LL2::",sortledll);
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
