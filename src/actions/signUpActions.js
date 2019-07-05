// // import firebase from 'firebase';
// import { firebaseAuth } from 'src/firebase';
// import {
//     SIGNUP_WITHEMAIL_SUCCESS,
//     SIGNUP_WITHEMAIL_ERROR,
// } from '../actions/actionTypes';
// import { Record } from 'immutable';
// import { FirebaseList } from 'src/firebase';
// import { createProfile } from './profileActions.js'

// export const Profile = Record({
//     key: '',
//     profileName: '',
//     profilePic: '',
//     teamName: '',
//     score: 0,
//     rank: 0,
//     teamKeysTier1: '',
//     teamKeysTier2: ''
// });

// export const profileFireDB = new FirebaseList({}, Profile);


// export function signUpWithEmail(name, teamName, email, pass) {
//     const profileData = {
//         profileName: name,
//         teamName: teamName,
//         profilePic: "http://www.sbcs.edu.tt/wp-content/uploads/2016/04/profile-default.png",
//     }
//     console.log("SU2::", name)
//     return dispatch => {
//         const { auth, getState } = getState();
//         const uid = auth.id
//         return dispatch(firebaseAuth.createUserWithEmailAndPassword(email, pass)).then((result) => {
//             console.log("SU3::", result)
//             return dispatch(signUpWithEmailSuccess(result)).then(() => {
//                 return dispatch(createProfile(profileData))
//                 console.log("SU4::",)
//             })
//         }).catch(error => dispatch(signUpWithEmailError(error)));
//     };
// }

// // export function signUpWithEmail(name, teamName,email, pass) {
// //     var profileName = name;
// //     var teamKeysTier1 = "ph1";
// //     var teamKeysTier2 = "ph2";
// //     var score = 0
// //     var rank = 0
// //     var profilePic = "http://www.sbcs.edu.tt/wp-content/uploads/2016/04/profile-default.png"
// //     console.log("SU2::",name)
// //     return dispatch => {
// //         const { auth, getState } = getState();
// //         const uid = auth.id
// //         firebaseAuth.createUserWithEmailAndPassword(email, pass)
// //             .then(result => dispatch(signUpWithEmailSuccess(result)))
// //             .then(() => profileFireDB.set(uid,{ profileName, teamName, profilePic, teamKeysTier1, teamKeysTier2, score, rank, uid }))
// //             .catch(error => dispatch(signUpWithEmailError(error)));
// //     };
// // }

// export function signUpWithEmailSuccess(user) {
//     console.log('SUSUCCESS::', user)
//     return {
//         type: SIGNUP_WITHEMAIL_SUCCESS,
//         payload: user,
//     }
// }

// export function signUpWithEmailError(error) {
//     // debugger;
//     console.log('SUERROR::', error)
//     return {
//         type: SIGNUP_WITHEMAIL_ERROR,
//         payload: error,
//     }
// }



