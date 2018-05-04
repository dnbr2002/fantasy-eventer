import firebase from 'firebase';
import { firebaseAuth } from 'src/firebase';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from '../actions/actionTypes';
import toastr from 'toastr';

function authenticate(provider) {
  return dispatch => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => dispatch(signInSuccess(result)))
      .catch(error => dispatch(signInError(error)));
  };
}


export function initAuth(user) {
  return {
    type: INIT_AUTH,
    payload: user
  };
}


export function signInError(error) {
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
      container: toastr.warning('Looks like looks something went wrong with this Login.  Try a different provider', '', { timeOut: 9000, closeButton: true, })
    };

  }

}


export function signInSuccess(result) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: result.user
  };
}


export function signInWithFacebook() {
  return authenticate(new firebase.auth.FacebookAuthProvider());
}


export function signInWithGoogle() {
  return authenticate(new firebase.auth.GoogleAuthProvider());
}


export function signInWithTwitter() {
  return authenticate(new firebase.auth.TwitterAuthProvider());
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
