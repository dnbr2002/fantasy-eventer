import { createSelector } from 'reselect';

export function getTeamState(state) {
  console.log("STATE::",state);
  if (state) {
    return state;
  }
}

export function getTeamRecord(state) {
  console.log("STATE1::",state);
  var profileRecord
  if (state.team) {
    state.team.list.slice(0, 1).forEach(t => {
      profileRecord = t
    })
    return profileRecord;
  }
}

export function getTeamList(state) {
  console.log("STATE2::",state.team.list);  
  var teamKeysArray
    if(state.team.list.size > 0) {
    var teamArray1 = getTeamRecord(state).teamKeysTier1.split(',');
    var teamArray2 = getTeamRecord(state).teamKeysTier2.split(',');
    teamKeysArray = teamArray1.concat(teamArray2);
    }
  return teamKeysArray
}

export function getTeamFilter(state) {
  console.log("STATE3::",state);
  if (state.team.list.size > 0) {
    const selectedTeam = state.competitors.list.filter(
      competitor => getTeamList(state).some(teammate => teammate === competitor.key));
      console.log("STATE4::",selectedTeam);
    return selectedTeam
  }
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const LeagueTeamSelector = createSelector(
  getTeamState,
  getTeamRecord,
  getTeamList,
  getTeamFilter
);
