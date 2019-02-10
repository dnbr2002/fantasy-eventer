import { Record, List } from 'immutable';
import {
  CREATE_PROFILE_SUCCESS, 
  LOAD_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
} from '../actions/actionTypes';

export const ProfileState = new Record({
  list: new List()
});


export function profileReducer(state = new ProfileState(), { payload, type }) {
  switch (type) {
    case CREATE_PROFILE_SUCCESS:
      return state.merge({
        list: state.list.unshift(payload)
      });

    case LOAD_PROFILE_SUCCESS:
      console.log("RED---LOADPROFILE::",payload);
      return state.set('list', new List(payload.reverse()));


    case UPDATE_PROFILE_SUCCESS:
    return state.merge({
      list: state.list.map(user => {
        return user.key === payload.key ? payload : user;
      })
    });

    default:
      return state;
  }
}
