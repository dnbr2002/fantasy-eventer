import { createSelector } from 'reselect';

export function getTeamState(state) {
  if (state) {
    return state;
  }
}

export function getTeamRecord(state) {
  var profileRecord
  if (state.team) {
    state.team.list.slice(0, 1).forEach(t => {
      profileRecord = t
    })
    return profileRecord;
  }
}

export function getTeamList(state) {
  var teamKeysArray
  if (getTeamState(state).profile.list.size > 0) {
    var teamArray1 = getTeamRecord(state).teamKeysTier1.split(',');
    var teamArray2 = getTeamRecord(state).teamKeysTier2.split(',');
    teamKeysArray = teamArray1.concat(teamArray2);
    return teamKeysArray
  }
}

export function getTeamFilter(state) {
  if (state.team.list.size > 0) {
    const selectedTeam = state.competitors.list.filter(
      competitor => getTeamList(state).some(teammate => teammate === competitor.key));
    return selectedTeam
  }
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const TeamSelector = createSelector(
  getTeamState,
  getTeamRecord,
  getTeamList,
  getTeamFilter
);
