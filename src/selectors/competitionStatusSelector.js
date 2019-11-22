import { createSelector } from 'reselect';

export function getCompetition(state) {
    return state.competition;
}

export function getCompetitionList(state) {
    return state.competition.list;
}

export function getCompetitionStatus(competition) {
    var compStatus
    let sortedCompetition = competition.sort((a, b) => new Date(...b.date.split('/')) - new Date(...a.date.split('/')));
    sortedCompetition.slice(0, 1).forEach(comp => {
        compStatus = comp.active
    })
    console.log("COMPSTATUS::",compStatus);
    return compStatus
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const CompetitionStatusSelector = createSelector(
    getCompetitionList,
    getCompetitionStatus
);
