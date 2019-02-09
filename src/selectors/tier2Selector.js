import { createSelector } from 'reselect';

export function getCompetitors2(state) {
  return state.competitors;
}

export function getCompetitor2List(state) {
  return state.competitors.list;
}

export function getCompetitor2Filter(competitors) {
  const competitors2 = competitors.filter(
    competitor => competitor.tier === "2"
  )
  return competitors2
}

// export function getDeletedCompetitor1(state) {
//   return getCompetitors1(state).deleted;
// }


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const Tier2Selector = createSelector(
  getCompetitor2List,
  getCompetitor2Filter
);
