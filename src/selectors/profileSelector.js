import { createSelector } from 'reselect';

export function getProfile(state) {
  return state
}

export function getProfileList(state) {
    var profile
    state.profile.list.slice(0,1).forEach(record => {
        profile = record
    })
    return profile;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const ProfileSelector = createSelector(
  getProfile,
  getProfileList,
);
