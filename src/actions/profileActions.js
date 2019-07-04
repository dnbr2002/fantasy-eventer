import * as types from './actionTypes';
import { Record } from 'immutable';
import { FirebaseList, firebaseDb } from 'src/firebase';

export const Profile = Record({
  key: '',
  profileName: '',
  profilePic: '',
  teamName: '',
  score: 0,
  rank: 0,
  teamKeysTier1: '',
  teamKeysTier2: ''
});

export const profileFireDB = new FirebaseList({
  onAdd: createProfileSuccess,
  onChange: updateProfileSuccess,
  onLoad: loadProfileSuccess,
  //   onRemove: removeProfileSuccess
}, Profile);

export function createProfile(data) {
  console.log('CREATEPROFILE::', data)
  var profileName = data.profileName
  var teamName = data.teamName
  var profilePic = data.profilePic
  var teamKeysTier1 = "teamkeysplaceholder"
  var teamKeysTier2 = "teamkeysplaceholder"
  var score = 0
  var rank = 0
  return (dispatch, getState) => {
    const { auth } = getState();
    const uid = auth.id
    console.log("AUTHID::", uid);
    profileFireDB.set(uid, { profileName, teamName, profilePic, teamKeysTier1, teamKeysTier2, score, uid, rank })
      .then(result => dispatch(createProfileSuccess(result)))
      .catch(error => dispatch(createProfileError(error)));
  };
}

export function createProfileFromSignUp(data, uid) {
  console.log('CREATEPROFILE::', data)
  var profileName = data.profileName
  var teamName = data.teamName
  var profilePic = data.profilePic
  var teamKeysTier1 = "teamkeysplaceholder"
  var teamKeysTier2 = "teamkeysplaceholder"
  var score = 0
  var rank = 0
  return dispatch => {
    console.log("AUTHID::", uid);
    profileFireDB.path = `users/${uid}`;
    profileFireDB.set(uid, { profileName, teamName, profilePic, teamKeysTier1, teamKeysTier2, score, uid, rank })
      .then(result => dispatch(createProfileSuccess(result)))
      .catch(error => dispatch(createProfileError(error)));
  };
}

export function createProfileFromSocialLogin(metaData) {
  console.log('CREATEPROFILE::', metaData)
  var profileName = metaData.user.displayName
  var teamName = metaData.additionalUserInfo.profile.first_name + "'s team"
  var profilePic = metaData.user.photoURL
  var uid = metaData.user.uid
  var teamKeysTier1 = "teamkeysplaceholder"
  var teamKeysTier2 = "teamkeysplaceholder"
  var score = 0
  var rank = 0
  firebaseDb.ref(`users/${uid}/${uid}`).once('value').then(function (snapshot) {
    console.log("SNAPSHOT::", snapshot.val());
    if (!snapshot.exists()) {
      return dispatch => {
        console.log("HERE1::")
        console.log("AUTHID::", uid);
        profileFireDB.path = `users/${uid}`;
        profileFireDB.set(uid, { profileName, teamName, profilePic, teamKeysTier1, teamKeysTier2, score, uid, rank })
          .then(result => dispatch(createProfileSuccess(result)))
          .catch(error => dispatch(createProfileError(error)));
      };
    }
    console.log("HERE2::")
  })
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
  // console.log("PROFILECHANGES1::",changes);
  return (dispatch, getState) => {
    const { auth } = getState();
    console.log("PROFILECHANGES2::", auth.id);
    profileFireDB.update(key, changes)
      .catch(error => dispatch(updateProfileError(error)));
  };
}

export function updateProfileSuccess(profile) {
  // console.log("PROFILECHANGESSUCCESS::",profile);
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    payload: profile
  };
}

export function updateProfileError(error) {
  // console.log("PROFILECHANGESERROR::",error);
  return {
    type: types.UPDATE_PROFILE_ERROR,
    payload: error
  };
}