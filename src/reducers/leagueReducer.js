import { Record, List, fromJS, Immutable } from 'immutable';  //fromJS, toJS, List, Map
import { LOAD_LEAGUE_SUCCESS } from '../actions/actionTypes';
import { from } from 'rxjs';
import { mapProps } from 'recompose';

export const LeagueState = new Record({
    list: new List()
    
});


  

export function leagueReducer(state = new LeagueState(), {payload, type}) {
    switch (type) {
        case LOAD_LEAGUE_SUCCESS:
        console.log("REDPAYLOAD::",payload)
        // const rec = createRecord(payload);
        // console.log("REDPAYLOAD4::",rec);
        // console.log("REDPAYLOAD3::",fromJS(payload));
        return fromJS(payload);
                
        default:
            return state;
    }

}