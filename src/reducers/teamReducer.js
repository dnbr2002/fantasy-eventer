import { List, Record } from 'immutable';
import {
  CREATE_TEAMMATE_SUCCESS,
  REMOVE_TEAMMATE_SUCCESS,
  FILTER_TEAM,
  LOAD_TEAM_SUCCESS,
  UPDATE_TEAMMATE_SUCCESS,
  // PICK_TEAM
} from '../actions/actionTypes';

export const TeamState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null
});


export function teamReducer(state = new TeamState(), { payload, type }) {
  switch (type) {
    case CREATE_TEAMMATE_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
          state.previous :
          state.list.unshift(payload)
      });

    case REMOVE_TEAMMATE_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(team => team.key !== payload.key)
      });

    case FILTER_TEAM:
      return state.set('filter', payload.filterType || '');

      // case PICK_TEAM:
      

    case LOAD_TEAM_SUCCESS:
    console.log("LOADTEAM::",payload)
      return state.set('list', new List(payload));


    case UPDATE_TEAMMATE_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map(team => {
          return team.key === payload.key ? payload : team;
        })
      });

    // case SIGN_OUT_SUCCESS:
    //   return new TeamState();

    default:
      return state;
  }
}
