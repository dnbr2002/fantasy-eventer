// import firebase from 'firebase';
// import firebase from 'firebase/auth';
import { auth } from 'firebase/app';
import { firebaseAuth } from 'firebase/index.js';
import { createProfileFromSignUp, createProfileFromSocialLogin } from './profileActions.js';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  // SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_EMAIL_SUCCESS,
  SIGN_IN_EMAIL_ERROR
} from '../actions/actionTypes';
import toastr from 'toastr';

function authenticate(provider) {
  return dispatch => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => {
        console.log("AUTHResult::", result)
        dispatch(signInSuccess(result))
        return dispatch(createProfileFromSocialLogin(result))
      })
      .catch(error => {
        console.log("AUTHError::",error);
        dispatch(signInError(error))
      }
        );
  };
}

export function initAuth(user) {
  // console.log("AUTHUSER::", user);
  return {
    type: INIT_AUTH,
    payload: user
  };
}

export function signInError(error) {
  console.log('SIERROR2::', error);
  if (error.code === "auth/account-exists-with-different-credential") {
    return {
      type: SIGN_IN_ERROR,
      payload: error,
      container: toastr.info('Looks like ' + error.email + ' was already used with a different social login provider here.  Please use a different provider to login to your existing acct', '', { timeOut: 9000, closeButton: true, })
    };
  }
  else {
    return {
      type: SIGN_IN_ERROR,
      payload: error,
      container: toastr.error('Something went wrong with Login.  '+error, { timeOut: 9000, closeButton: true, })
    };
  }
}

export function signInSuccess(result) {
  console.log('SISUCCESS::', result);
  // return createProfileFromSocialLogin(result)
  return {
    type: SIGN_IN_SUCCESS,
    payload: result.user
  };
}

export function signInEmailSuccess(result) {
  // console.log('SISUCCESS::', result);
  return {
    type: SIGN_IN_EMAIL_SUCCESS,
    payload: result
  };
}

export function signInEmailError(error) {
  // console.log('SISUCCESS::', error);
  return {
    type: SIGN_IN_EMAIL_ERROR,
    payload: error
  };
}

export function signUpSuccess(result, profileData) {
  // console.log("RESULT::",result);
  return createProfileFromSignUp(profileData, result)
  // return {
  //   type: SIGN_UP_SUCCESS,
  //   payload: result.user,
  //   container: toastr.info('Registration completed successfully.  Please Login now', { timeOut: 9000, closeButton: true, })
  // };
}

export function signUpError(error) {
  console.log('SIERROR2::', error);
    return {
      type: SIGN_UP_ERROR,
      payload: error,
      container: toastr.error(''+error, { timeOut: 9000, closeButton: true, })
    };
}

export function signUpWithEmail(email, pass, name, team) {
  const profileData = {
    profileName: name,
    teamName: team,
    profilePic: "http://www.sbcs.edu.tt/wp-content/uploads/2016/04/profile-default.png",
}
  return dispatch => {
      firebaseAuth.createUserWithEmailAndPassword(email, pass)
          .then(result => dispatch(signUpSuccess(result, profileData)))      
          .catch(error => dispatch(signUpError(console.log("EmailSUError::",error))));
  };
}

export function signInWithEmail(email, pass) {
  return dispatch => {
      firebaseAuth.signInWithEmailAndPassword(email, pass)
          .then(result => dispatch(signInEmailSuccess(result)))
          .catch(error => dispatch(signInEmailError(error)));
  };
}


export function signInWithFacebook() {
  return authenticate(new auth.FacebookAuthProvider());
}


export function signInWithGoogle() {
  return authenticate(new auth.GoogleAuthProvider());
}


export function signInWithTwitter() {
  return authenticate(new auth.TwitterAuthProvider());
}


export function signOut() {
  return dispatch => {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  };
}


export function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS
  };
}
