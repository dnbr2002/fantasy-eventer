import { LOAD_LEAGUE_SUCCESS } from '../actions/actionTypes';
import _ from 'lodash';

const user = [];

export function leagueReducer(state = user, { payload, type }) {
  switch (type) {
    case LOAD_LEAGUE_SUCCESS:
      console.log("PAYLOAD::",payload)
      var array = _.values(payload)
      // console.log("PAYLOAD1::",array)
      // const reduceArray = array.reduce((reduceArray, obj) => {
      //   if (obj[Object.keys(obj)[0]].teamKeysTier1.split(",").length === 3 && obj[Object.keys(obj)[0]].teamKeysTier2.split(",").length === 6) {
      //     reduceArray.push(obj[Object.keys(obj)[0]]);
      //   }
      //   return reduceArray
      // }, []);
      // console.log("mapArray::", reduceArray);
      // const sorted = reduceArray.slice().sort((a, b) => a.score > b.score ? 1 : -1);
      // console.log("mapArray2::", reduceArray);
      // const sortedMap = sorted.map((x, index) => x.rank = index + 1)
      // console.log("mapArray3::",sorted);
      return Object.assign([], array)

    default:
      return state;
  }
}
