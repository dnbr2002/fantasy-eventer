import { Record, List, fromJS, Immutable } from 'immutable';  //fromJS, toJS, List, Map
import { LOAD_LEAGUE_SUCCESS } from '../actions/actionTypes';
import { from } from 'rxjs';
import { mapProps } from 'recompose';


const user = [{
      profileName: 'FEKing',
      profilePic: 'https://i1.sndcdn.com/avatars-000383656514-x83gqz-t500x500.jpg',
      score: 100,
      teamKeysTier1: '',
      teamKeysTier2: '',
      teamName: 'TheCreator',
      uid: ''
  }];  

export const LeagueState = new Record({
  list: new List()
}); 

export function leagueReducer(state = user, {payload, type}) {
    switch (type) {
        case LOAD_LEAGUE_SUCCESS:
        payload.map(x => {
        const outObj = x[Object.keys(x)[0]];
        state.push(outObj);
        })
        console.log("user::",state)
        return Object.assign([], state);
                
        default:
            return state;
    }

}