import { LOAD_LEAGUE_SUCCESS } from '../actions/actionTypes';
import { List, Record } from 'immutable';

const user = [{
  profileName: 'FEKing',
  profilePic: '',
  score: 100,
  teamKeysTier1: '',
  teamKeysTier2: '',
  teamName: 'TheCreator',
  uid: '',
  rank: ''
}];

// const userList = new List();

export const LeagueState = new Record({
  list: new List(user)
});


export function leagueReducer(state = new LeagueState(), { payload, type }) {
  switch (type) {
    case LOAD_LEAGUE_SUCCESS:
      var counter = 0
      var tempList = new List(payload)
      // payload.map(x => {        
      //   const outObj = x[Object.keys(x)[0]];
      //   tempList.update(push(outObj)
      // })
      const [ ...keys ] = tempList.keys();
      console.log("REDA::",payload.keys());
      console.log("REDA1::", ...keys)
      tempList = tempList.update(tempList.keys, keys => {
        console.log("REDAR1::",tempList.keys)
      })
      console.log("REDARR::",tempList);
      tempList.sort((a,b) => a.score > b.score ? 1 : -1)
      tempList = tempList.update('rank', rank => rank.map((row, index) => row.set('rank', index)))
      console.log("REDARR2::",tempList);
      return state.set('list', new List(tempList));
      // return state.set('list', new List(payload));

      // return state.set('list', new List(payload.reverse()));

      // return Object.assign([], state, {
      //   profileName: Object.assign({}, state.profileName),
      //   profileName: Object.assign({}, state.profileName),
      //   profilePic: Object.assign({}, state.profilePic),
      //   score: Object.assign({}, state.score),
      //   teamKeysTier1: Object.assign({}, state.teamKeysTier1),
      //   teamKeysTier2: Object.assign({}, state.teamKeysTier1),
      //   teamName: Object.assign({}, state.teamName),
      //   uid: Object.assign({}, state.uid),
      //   rank: Object.assign({}, count)
      // })     

    default:
      return state;
  }
}
