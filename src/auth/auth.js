import { firebaseAuth } from 'firebase/index.js';
import * as authActions from '../actions/authActions';


export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      authUser => {
        dispatch(authActions.initAuth(authUser));
        unsubscribe();
        resolve();
      },
      error => reject(error)
    );
  });
}
