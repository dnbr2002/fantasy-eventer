import competitors from '../data/posts'
import {
    REMOVE_COMPETITOR_SUCCESS,
    REMOVE_COMPETITOR_ERROR,
    ADD_COMPETITOR_SUCCESS,
    ADD_COMPETITOR_ERROR
} from '../actions/actionTypes';

export function adminReducer(state = competitors, action) {
    switch (action.type) {
        case REMOVE_COMPETITOR_SUCCESS:
            return [...state.slice(0, action.index), ...state.slice(action.index + 1)]
        case ADD_COMPETITOR_SUCCESS:
            return [...state, action.competitor]
        default:
            //console.log("ADMINREDUCEDEFAULT::", state);
            return state;
    }
}

