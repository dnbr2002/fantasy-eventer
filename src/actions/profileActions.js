import * as types from './actionTypes';
import { Record } from 'immutable';
import { FirebaseList, firebaseDb } from 'firebase/index.js';

export const Profile = Record({
  key: '',
  profileName: null,
  profilePic: null,
  teamName: null,
  email: null,
  country: null,
  uid: null,
  score: 0,
  totalScore: 0,
  totalRank: 0,
  rank: 0,
  teamKeysTier1: '',
  teamKeysTier2: 'teamkeysplaceholder'
});

export const profileFireDB = new FirebaseList({
  onAdd: createProfileSuccess,
  onChange: updateProfileSuccess,
  onLoad: loadProfileSuccess,
  //   onRemove: removeProfileSuccess
}, Profile);

export function createProfile(data) {
  // console.log('CREATEPROFILE::', data)
  var profileName = data.profileName;
  var teamName = data.teamName;
  var profilePic = data.profilePic;
  var email = data.email;
  var country = data.country
  var score = 0;
  var rank = 0;
  var totalScore = 0;
  var totalRank = 0;
  var teamKeysTier1 ='';
  var teamKeysTier2 = '';
  return (dispatch, getState) => {
    const { auth } = getState();
    const uid = auth.id
    console.log("AUTHID::", uid);
    profileFireDB.set(uid, { profileName, teamName, profilePic, email, country, uid, score, rank, totalScore, totalRank, teamKeysTier1, teamKeysTier2 })
      .then(result => dispatch(createProfileSuccess(result)))
      .catch(error => dispatch(createProfileError(error)));
  };
}

export function createProfileFromSignUp(data, fbData) {
  // console.log('CREATEPROFILE::', data);
  // console.log('CREATEPROFILE2::', fbData);
  var profileName = data.profileName;
  var teamName = data.teamName;
  var profilePic = data.profilePic;
  var email = fbData.user.email;
  var country = "US";
  var score = 0;
  var rank = 0;
  var totalScore = 0;
  var totalRank = 0;
  var teamKeysTier1 ='';
  var teamKeysTier2 = '';
  var uid = fbData.user.uid;
  return dispatch => {
    // console.log("AUTHID::", uid);
    profileFireDB.path = `users/${uid}`;
    profileFireDB.set(uid, { profileName, teamName, profilePic, email, country, uid, score, rank, totalScore, totalRank, teamKeysTier1, teamKeysTier2 })
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
  var profilePic;
  if(metaData.credential.providerId === "google.com") {
    profilePic = metaData.additionalUserInfo.profile.profile_image_url
  } else if (metaData.credential.providerId === "facebook.com") {
    profilePic = metaData.additionalUserInfo.profile.picture.data.url
  } else {
    teamName = metaData.additionalUserInfo.profile.profile_image_url;
  }   

  var email = metaData.additionalUserInfo.profile.email;
  var country = "US";
  var score = 0;
  var rank = 0;
  var totalScore = 0;
  var totalRank = 0;
  var teamKeysTier1 ='';
  var teamKeysTier2 = '';
  var uid = metaData.user.uid;
  return dispatch => {
    // console.log("CREATEPROFILE1::", uid);
    firebaseDb.ref(`users`).child(`${uid}`).once('value').then(snapshot => {
      if (!snapshot.exists()) {
        // console.log('CREATEPROFILE2::', uid)
        profileFireDB.path = `users/${uid}`;
        profileFireDB.set(uid, { profileName, teamName, profilePic, email, country, uid, score, rank, totalScore, totalRank, teamKeysTier1, teamKeysTier2 })
          .then(result => dispatch(createProfileSuccess(result)))
          .catch(error => dispatch(createProfileError(error)));
      }
    })
  }
}


export function createProfileSuccess(data) {
  // console.log('CREATEPROFILESUSUCCESS::', data)
  return {
    type: types.CREATE_PROFILE_SUCCESS,
    payload: data,
  }
}

export function createProfileError(error) {
  // console.log('CREATEPROFILEEROR::', error)
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
  console.log('LOADPROFILESUSUCCESS::', data);
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
  // console.log("PROFILECHANGES0::",changes + key);
  // console.log("PROFILECHANGES1::",key);
  return (dispatch) => {
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