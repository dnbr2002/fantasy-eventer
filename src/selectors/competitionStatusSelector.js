import { createSelector } from 'reselect';

export function getCompetition(state) {
    return state.competition;
}

export function getCompetitionList(state) {
    return state.competition.list;
}

export function getCompetitionStatus(competition) {
    var compStatus
    competition.slice(0, 1).forEach(comp => {
        compStatus = comp.active
    })
    return compStatus
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const CompetitionStatusSelector = createSelector(
    getCompetitionList,
    getCompetitionStatus
);
