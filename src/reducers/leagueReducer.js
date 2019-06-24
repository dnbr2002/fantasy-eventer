import { LOAD_LEAGUE_SUCCESS } from '../actions/actionTypes';

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

export function leagueReducer(state = user, {payload, type}) {
    switch (type) {
        case LOAD_LEAGUE_SUCCESS:
        payload.map(x => {
        const outObj = x[Object.keys(x)[0]];
        state.push(outObj);
        })
        return Object.assign([], state);
                
        default:
            return state;
    }

}