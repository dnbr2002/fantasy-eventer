import { LOAD_LEAGUE_SUCCESS } from '../actions/actionTypes';
import _ from 'lodash';

const user = [];

export function leagueReducer(state = user, { payload, type }) {
  switch (type) {
    case LOAD_LEAGUE_SUCCESS:
      console.log("PAYLOAD::",payload)
      var array = _.values(payload)
      return Object.assign([], array)

    default:
      return state;
  }
}
