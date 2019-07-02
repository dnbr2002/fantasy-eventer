import { LOAD_LEAGUE_SUCCESS } from '../actions/actionTypes';
import _ from 'lodash';

const user = [];

export function leagueReducer(state = user, { payload, type }) {
  switch (type) {
    case LOAD_LEAGUE_SUCCESS:
      var array = _.values(payload)
      const mapArray = array.map(x => { return x[Object.keys(x)[0]] });
      const sorted = mapArray.slice().sort((a, b) => a.score > b.score ? 1 : -1); 
      const sortedMap = sorted.map((x, index) => x.rank = index + 1)
      return Object.assign([], sorted)

    default:
      return state;
  }
}
