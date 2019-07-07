import { LOAD_LEAGUE_SUCCESS } from '../actions/actionTypes';
import _ from 'lodash';

const user = [];

export function leagueReducer(state = user, { payload, type }) {
  switch (type) {
    case LOAD_LEAGUE_SUCCESS:
      var array = _.values(payload)
      const reduceArray = array.reduce((reduceArray, obj) => {
        if (obj[Object.keys(obj)[0]].teamKeysTier1.split(",").length === 3 && obj[Object.keys(obj)[0]].teamKeysTier2.split(",").length === 6) {
          reduceArray.push(obj[Object.keys(obj)[0]]);
        }
        return reduceArray
      }, []);
      console.log("mapArray::", reduceArray);
      const sorted = reduceArray.slice().sort((a, b) => a.score > b.score ? 1 : -1);
      const sortedMap = sorted.map((x, index) => x.rank = index + 1)
      console.log("mapArray3::",sortedMap)
      return Object.assign([], sorted)

    default:
      return state;
  }
}
