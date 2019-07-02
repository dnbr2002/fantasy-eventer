import { LOAD_LEAGUE_SUCCESS } from '../actions/actionTypes';
import _ from 'lodash';

const user = [];

export function leagueReducer(state = user, { payload, type }) {
  switch (type) {
    case LOAD_LEAGUE_SUCCESS:
      var array = _.values(payload)
      array.forEach(x => state.push(x[Object.keys(x)[0]]));
      state.sort((a, b) => a.score > b.score ? 1 : -1)
      state.map((x, index) => x.rank = index + 1)
      return Object.assign([], state)

    default:
      return state;
  }
}
