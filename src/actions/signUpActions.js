// import firebase from 'firebase';
import { firebaseAuth } from 'src/firebase';
import {
    SIGNUP_WITHEMAIL_SUCCESS,
    SIGNUP_WITHEMAIL_ERROR,
} from '../actions/actionTypes';




export function signUpWithEmail(email, pass) {
    console.log('EMAILPASSWORD::',email+pass)
    return dispatch => {
        firebaseAuth.createUserWithEmailAndPassword(email, pass)
            .then(result => dispatch(signUpWithEmailSuccess(result)))
            .catch(error => dispatch(signUpWithEmailError(error)));
    };
}

export function signUpWithEmailSuccess(user) {
    console.log('SUSUCCESS::', user)
    return {
        type: SIGNUP_WITHEMAIL_SUCCESS,
        payload: user,
    }
}

export function signUpWithEmailError(error) {
    // debugger;
    console.log('SUERROR::', error)
    return {
        type: SIGNUP_WITHEMAIL_ERROR,
        payload: error,
    }
}



