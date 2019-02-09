import { createSelector } from 'reselect';

export function getCompetitors1(state) {
  return state.competitors;
}

export function getCompetitor1List(state) {
  return state.competitors.list;
}

export function getCompetitor1Filter(competitors) {
  const competitors1 = competitors.filter(
    competitor => competitor.tier === "1"
  )
  return competitors1
}

// export function getDeletedCompetitor1(state) {
//   return getCompetitors1(state).deleted;
// }


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const Tier1Selector = createSelector(
  getCompetitor1List,
  getCompetitor1Filter
);
