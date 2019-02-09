import { createSelector } from 'reselect';

export function getTeamState(state) {
  console.log("PROFILE::", state)
  return state.team;
}

export function getTeamRecord(state) {
  console.log("PROFILESELECTORLISTVALUE::",state.team.list.slice(0,1))
  var team
  state.team.list.slice(0,1).forEach(t => {
      console.log("PROFILESELECTORXXXXX::",t);
      team = t
  })
  console.log("PROFILESELECTORPROFILE::",team);
  return team;
}


export function getTeamList(teamRecord) {
  console.log("PROFILESTATE::", teamRecord)
    var teamArray1 = teamRecord.team.teamKeysTier1.split(',');
    var teamArray2 = teamRecord.team.teamKeysTier2.split(',');
    var teamArray = teamArray1.concat(teamArray2);
    console.log("SELECTORSTATE2::", teamArray)
    return teamArray
}

export function getCompetitorList(state) {
  return state.competitors.list
}

export function getTeamFilter(team, competitors) {
  console.log("TEAM::", team)
  const selectedTeam = competitors.filter(
    competitor => team.some(teammate => teammate === competitor.key));
  return selectedTeam
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const TeamSelector = createSelector(
  getTeamState,
  getTeamRecord,
  getTeamList,  
);
