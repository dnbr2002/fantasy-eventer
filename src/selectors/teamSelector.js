import { createSelector } from 'reselect';

export function getTeamState(state) {
  console.log("TEAM::", state.team.list.size)
  if (state) {
    return state.team;
  }
}

export function getTeamRecord(state) {
  if (state.team) {
    console.log("TEAMSELECTORLISTVALUE::", state.team.list.slice(0, 1))
    var team
    state.team.list.slice(0, 1).forEach(t => {
      console.log("TEAMSELECTORXXXXX::", t);
      team = t
    })
    console.log("TEAMSELECTORPROFILE::", team);
    return team;
  }
}

export function getTeamList(state) {
  console.log("TEAM2::",state.list)
  if (state.list > 0) {
    console.log("TEAMSTATE::", state)
    var teamArray1 = state.team.teamKeysTier1.split(',');
    var teamArray2 = state.team.teamKeysTier2.split(',');
    var teamArray = teamArray1.concat(teamArray2);
    console.log("SELECTORSTATE2::", teamArray)
    return teamArray
  }
}

export function getCompetitorList(state) {
  return state.competitors.list
}

export function getTeamFilter(state) {
  console.log("TEAM3::", state)
  const selectedTeam = state.competitors.filter(
    competitor => state.team.some(teammate => teammate === competitor.key));
  return selectedTeam
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const TeamSelector = createSelector(
  getTeamState,
  getTeamRecord,
  getTeamList,
  getCompetitorList,
  getTeamFilter
);
