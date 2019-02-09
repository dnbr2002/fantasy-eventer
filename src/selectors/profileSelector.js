import { createSelector } from 'reselect';

export function getProfile(state) {
  console.log("PROFILESELECTORVALUE::",state.profile)
  return state
}

export function getProfileList(state) {
  // debugger;
    console.log("PROFILESELECTORLISTVALUE::",state.profile.list.slice(0,1))
    var profile
    state.profile.list.slice(0,1).forEach(record => {
        console.log("PROFILESELECTORXXXXX::",record);
        profile = record
    })
    console.log("PROFILESELECTORPROFILE::",profile);
    return profile;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const ProfileSelector = createSelector(
  getProfile,
  getProfileList,
);
