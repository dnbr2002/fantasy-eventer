import { createSelector } from 'reselect';

export function getCompetitors(state) {
    return state.competitors;
}

export function getCompetitorList(state) {
    return getCompetitors(state).list;
}

// export function getCompetitor1Filter() {

// }

// export function getDeletedCompetitor1(state) {
//   return getCompetitors1(state).deleted;
// }


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleCompetitors = createSelector(
    getCompetitorList,
    (competitors) => {
        return competitors
    }
);

