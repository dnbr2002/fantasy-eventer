import { List, Record } from 'immutable';
import {
  CREATE_COMPETITION_SUCCESS,
  REMOVE_COMPETITION_SUCCESS,
  LOAD_COMPETITION_SUCCESS,
  UPDATE_COMPETITION_SUCCESS
} from '../actions/actionTypes';

export const CompetitionState = new Record({
  deleted: null,
  list: new List(),
  previous: null
});


export function competitionReducer(state = new CompetitionState(), { payload, type }) {
  switch (type) {
    case CREATE_COMPETITION_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
          state.previous :
          state.list.unshift(payload)
      });

    case REMOVE_COMPETITION_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(competition => competition.key !== payload.key)
      });

    case LOAD_COMPETITION_SUCCESS:
    // console.log('LOADCOMPS::',payload);
      return state.set('list', new List(payload));

    case UPDATE_COMPETITION_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map(competition => {
          return competition.key === payload.key ? payload : competition;
        })
      });

    default:
    // console.log('DEFAULTCOMPS::',payload);
      return state;
  }
}
