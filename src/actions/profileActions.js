import * as types from './actionTypes';
import { Record } from 'immutable';
import { FirebaseList, firebaseDb } from 'src/firebase';

export const Profile = Record({
  key: '',
  profileName: null,
  profilePic: null,
  teamName: null,
  email: null,
  country: "United States",
  uid: null,
  score: 0,
  rank: 0,
  teamKeysTier1: 'teamkeysplaceholder',
  teamKeysTier2: 'teamkeysplaceholder'
});

export const profileFireDB = new FirebaseList({
  onAdd: createProfileSuccess,
  onChange: updateProfileSuccess,
  onLoad: loadProfileSuccess,
  //   onRemove: removeProfileSuccess
}, Profile);

export function createProfile(data) {
  console.log('CREATEPROFILE::', data)
  var profileName = data.profileName;
  var teamName = data.teamName;
  var profilePic = data.profilePic;
  var email = data.email;
  var country = data.country
  return (dispatch, getState) => {
    const { auth } = getState();
    const uid = auth.id
    console.log("AUTHID::", uid);
    profileFireDB.set(uid, { profileName, teamName, profilePic, email, country, uid })
      .then(result => dispatch(createProfileSuccess(result)))
      .catch(error => dispatch(createProfileError(error)));
  };
}

export function createProfileFromSignUp(data, uid) {
  console.log('CREATEPROFILE::', data)
  var profileName = data.profileName;
  var teamName = data.teamName;
  var profilePic = data.profilePic;
  var email = data.email;
  var country = data.country;
  return dispatch => {
    console.log("AUTHID::", uid);
    profileFireDB.path = `users/${uid}`;
    profileFireDB.set(uid, { profileName, teamName, profilePic, email, country, uid })
      .then(result => dispatch(createProfileSuccess(result)))
      .catch(error => dispatch(createProfileError(error)));
  };
}

export function createProfileFromSocialLogin(metaData) {
  console.log('CREATEPROFILE::', metaData)
  var profileName = metaData.user.displayName;
  var teamName;
  if(metaData.credential.providerId === "google.com") {
    teamName = metaData.additionalUserInfo.profile.given_name + "'s team";
  } else if (metaData.credential.providerId === "facebook.com") {
    teamName = metaData.additionalUserInfo.profile.first_name + "'s team";
  } else {
    teamName = metaData.additionalUserInfo.profile.screen_name;
  }    
  var profilePic = metaData.user.photoURL;
  var email = metaData.user.email;
  var country = "United States";
  var uid = metaData.user.uid;

  return dispatch => {
    console.log("CREATEPROFILE1::", uid);
    firebaseDb.ref(`users`).child(`${uid}`).once('value').then(snapshot => {
      if (!snapshot.exists()) {
        console.log('CREATEPROFILE2::', uid)
        profileFireDB.path = `users/${uid}`;
        profileFireDB.set(uid, { profileName, teamName, profilePic, email, country, uid })
          .then(result => dispatch(createProfileSuccess(result)))
          .catch(error => dispatch(createProfileError(error)));
      }
    })
  }
}


export function createProfileSuccess(data) {
  console.log('CREATEPROFILESUSUCCESS::', data)
  return {
    type: types.CREATE_PROFILE_SUCCESS,
    payload: data,
  }
}

export function createProfileError(error) {
  console.log('CREATEPROFILEEROR::', error)
  return {
    type: types.CREATE_PROFILE_ERROR,
    payload: error,
  }
}

export function loadProfile(key) {
  return (dispatch, getState) => {
    const { auth } = getState();
    profileFireDB.path = `users/${auth.id}`;
    profileFireDB.subscribe(dispatch);
  };
}

export function loadProfileSuccess(data) {
  // console.log('LOADPROFILESUSUCCESS::', data)
  return {
    type: types.LOAD_PROFILE_SUCCESS,
    payload: data,
  }
}

export function loadProfileError(error) {
  // console.log('LOADPROFILEERROR::', error)
  return {
    type: types.LOAD_PROFILE_ERROR,
    payload: error,
  }
}

export function updateProfile(key, changes) {
  console.log("PROFILECHANGES0::",changes + key);
  console.log("PROFILECHANGES1::",key);
  return (dispatch, getState) => {
    const { auth } = getState();
    console.log("PROFILECHANGES2::", auth.id);
    profileFireDB.update(key, changes)
      .catch(error => dispatch(updateProfileError(error)));
  };
}

export function updateProfileSuccess(profile) {
  console.log("PROFILECHANGESSUCCESS::",profile);
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    payload: profile
  };
}

export function updateProfileError(error) {
  console.log("PROFILECHANGESERROR::",error);
  return {
    type: types.UPDATE_PROFILE_ERROR,
    payload: error
  };
}