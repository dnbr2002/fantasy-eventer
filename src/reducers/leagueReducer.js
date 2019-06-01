import { Record, List } from 'immutable';  //fromJS, toJS, List, Map
import { LOAD_LEAGUE_SUCCESS } from '../actions/actionTypes';
import { from } from 'rxjs';

export const LeagueState = new Record({
    list: new List()
})

const data = [];

export function transform(UserRecord) {
    const object = UserRecord[Object.keys(UserRecord)[0]];
    data.push(object);
    console.log("REDPAYLOAD2::",object);
    return object;
}

export function leagueReducer(state = new LeagueState(), {payload, type}) {
    switch (type) {
        case LOAD_LEAGUE_SUCCESS:
        // console.log("REDPAYLOAD::",payload)
        // var reducepayload = from(payload)
        // var LR = reducepayload.subscribe(val => transform(val))
        // console.log("REDPAYLOAD3::",data);
        // data.map(index => )
        // return state.list.concat(data);
        return payload;
                
        default:
            return state;
    }

}