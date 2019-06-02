import { createSelector } from 'reselect';


export function getLeague(state) {
  if (state) {
    console.log("LSELECT::", state.league);
    return state.league;
  }
}

// function transform(UserRecord)
// {
//   const outerObj = UserRecord[Object.keys(UserRecord)[0]];
//   updatedList = state.update('myList', myList => myList.push(outerObj));
//   console.log("LIST1::",updatedList);
//   data.push(outerObj);
//   console.log("LIST2::",data);
// }

export function getSortedLeague(state) {

}
export function getLeagueList(state) {  

}




//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const LeagueSelector = createSelector(
  getLeague,
  // getSortedLeague,
  // getLeagueList,
);
