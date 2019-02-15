import { Record, List } from 'immutable';  //fromJS, toJS, List, Map
import {
    LOAD_LEAGUE_SUCCESS,
    // LOAD_LEAGUE_ERROR,
} from '../actions/actionTypes';

export const LeagueState = new Record({
    list: new List()
})

export function leagueReducer(state = new LeagueState(), {payload, type}) {
    switch (type) {
        case LOAD_LEAGUE_SUCCESS:
        console.log("REDPAYLOAD::",payload)
        return state.set('list', new List(payload));
                
        default:
            return state;
    }

}