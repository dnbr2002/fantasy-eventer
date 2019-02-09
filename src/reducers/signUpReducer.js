// import { Record } from 'immutable'
import { SIGNUP_WITHEMAIL_SUCCESS, SIGNUP_WITHEMAIL_ERROR } from '../actions/actionTypes';

// export const AuthState = new Record({
//     authenticated: false,
//     id: null
// });

export const signUpReducer = (state = [], action) => {
    switch(action.type) {
        case SIGNUP_WITHEMAIL_SUCCESS:
        // console.log('SURSUCCESS::', action)
            const { user: { uid: userId} } = action;
            return { ...state, loggedIn: true, userId }
        case SIGNUP_WITHEMAIL_ERROR:
            const { error } = action;
            // console.log('SURERROR::', error)
            return { ...state, loggedIn: false, error }
        default:
        // console.log('SURDEF::', state)
            return state;
    }
}