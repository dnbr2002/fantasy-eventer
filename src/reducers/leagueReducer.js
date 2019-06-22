import { Record, List, fromJS, Immutable } from 'immutable';  //fromJS, toJS, List, Map
import { LOAD_LEAGUE_SUCCESS } from '../actions/actionTypes';
import { from } from 'rxjs';
import { mapProps } from 'recompose';


const user = [{
    UID: {
      profileName: '',
      profilePic: '',
      score: 0,
      teamKeysTier1: '',
      teamKeysTier2: '',
      teamName: '',
      uid: ''
    }
  }];  

export function leagueReducer(state = user, {payload, type}) {
    switch (type) {
        case LOAD_LEAGUE_SUCCESS:
        payload.map(x => {
        const outObj = x[Object.keys(x)[0]];
        state.push(outObj);
        })
        console.log("REDPAYLOAD::",payload)
        return state
                
        default:
            return state;
    }

}