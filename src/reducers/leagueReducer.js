import { Record, List, fromJS, Immutable } from 'immutable';  //fromJS, toJS, List, Map
import { LOAD_LEAGUE_SUCCESS } from '../actions/actionTypes';
import { from } from 'rxjs';
import { mapProps } from 'recompose';


const user = [{
    UID: {
      Key: {
      profileName: '',
      profilePic: '',
      score: 0,
      teamKeysTier1: '',
      teamKeysTier2: '',
      teamName: '',
      uid: ''
    }
    }
  }];  

export function leagueReducer(state = user, {payload, type}) {
    switch (type) {
        case LOAD_LEAGUE_SUCCESS:
        console.log("REDPAYLOAD::",payload)
        return payload;
                
        default:
            return state;
    }

}