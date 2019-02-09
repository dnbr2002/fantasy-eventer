import { List, Record } from 'immutable';
import {
  CREATE_COMPETITOR_SUCCESS,
  REMOVE_COMPETITORS_SUCCESS,
  REMOVE_COMPETITOR_SUCCESS,
  FILTER_COMPETITORS,
  LOAD_COMPETITORS_SUCCESS,
  UPDATE_COMPETITOR_SUCCESS,
  GET_COMPETITION_STATUS_SUCCESS
} from '../actions/actionTypes';

export const CompetitorsState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null,
});


export function adminReducer(state = new CompetitorsState(), { payload, type }) {
  switch (type) {
    case CREATE_COMPETITOR_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
          state.previous :
          state.list.unshift(payload)
      });

    case REMOVE_COMPETITORS_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(competitor1 => competitor1.key !== payload.key)
      });

      case REMOVE_COMPETITOR_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(competitor1 => competitor1.key !== payload.key)
      });

    case FILTER_COMPETITORS:
      return state.set('filter', payload.filterType || '');

    case LOAD_COMPETITORS_SUCCESS:
    // console.log('LOADCOMPS::',payload);
      return state.set('list', new List(payload));

    case UPDATE_COMPETITOR_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map(competitor1 => {
          return competitor1.key === payload.key ? payload : competitor1;
        })
      });

    case GET_COMPETITION_STATUS_SUCCESS:
    return payload;

    // case SIGN_OUT_SUCCESS:
    //   return new CompetitorsState();

    default:
    // console.log('DEFAULTCOMPS::',payload);
      return state;
  }
}
