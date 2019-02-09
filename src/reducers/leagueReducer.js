import { Record } from 'immutable';  //fromJS, toJS, List, Map
import {
    LOAD_LEAGUE_SUCCESS,
    // LOAD_LEAGUE_ERROR,
} from '../actions/actionTypes';

export const LeagueState = new Record({
    key: null
})

export function leagueReducer(state = new LeagueState(), {payload, type}) {
    switch (type) {
        case LOAD_LEAGUE_SUCCESS:
        console.log("REDPAYLOAD::",payload)
        return payload
        
        default:
            return state;
    }

}