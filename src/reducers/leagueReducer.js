import { LOAD_LEAGUE_SUCCESS } from '../actions/actionTypes';
import { List, Record, fromJS, Map, toJS } from 'immutable';

// const user = [{
//   profileName: 'FEKing',
//   profilePic: '',
//   score: 100,
//   teamKeysTier1: '',
//   teamKeysTier2: '',
//   teamName: 'TheCreator',
//   uid: '',
//   rank: ''
// }];

const user = [];

// const userList = new List();

export const LeagueState = new Record({
  list: new List(user)
});


export function leagueReducer(state = user, { payload, type }) {
  switch (type) {
    case LOAD_LEAGUE_SUCCESS:
      const tempList = new List(payload)
      tempList.sort((a,b) => a.score > b.score ? 1 : -1)
      tempList.map((list, index) => {  
        const tempMap = new Map(list[Object.keys(list)[0]])    
        const tempMap2 = tempMap.set('rank', index + 1);
        const tempJs = tempMap2.toJS();
        state.push(tempJs)
      });  
     // return state.set('list', new List(array));
      return Object.assign([], state)

    default:
      return state;
  }
}
