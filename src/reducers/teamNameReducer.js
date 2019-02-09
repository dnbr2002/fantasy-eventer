import { List, Record } from 'immutable';
import {
  CREATE_TEAM_NAME_SUCCESS,
  LOAD_TEAM_NAME_SUCCESS,
  // UPDATE_TEAM_NAME_SUCCESS,
} from '../actions/actionTypes';

export const TeamNameState = new Record({
  list: new List(),
});

// const TeamNameState = {};

export function teamNameReducer(state = new TeamNameState(), { payload, type }) {
  switch (type) {
    case CREATE_TEAM_NAME_SUCCESS:
      return state.merge({
        list: state.list.unshift(payload)
      })

    case LOAD_TEAM_NAME_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    // case UPDATE_TEAM_NAME_SUCCESS:
    // return state.merge({
    //   deleted: null,
    //   previous: null,
    //   list: state.list.map(team => {
    //     return team.key === payload.key ? payload : team;
    //   })
    // });

    default:
      return state;
  }
}
