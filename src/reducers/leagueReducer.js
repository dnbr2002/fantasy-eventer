import { Record, List } from 'immutable';  //fromJS, toJS, List, Map
import {
    LOAD_LEAGUE_SUCCESS,
    // LOAD_LEAGUE_ERROR,
} from '../actions/actionTypes';

// export const LeagueState = new Record({
//     list: new List()
// })
var is = {
    league: []
}

export function leagueReducer(state = is.league, {payload, type}) {
    switch (type) {
        case LOAD_LEAGUE_SUCCESS:
        console.log("REDPAYLOAD::",payload)
        return payload
        // return state.set('list', new List(payload));
                
        default:
            return state;
    }

}