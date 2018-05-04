import * as types from './actionTypes';

//action creators
export function removeCompetitor(index) {
    return {
        type: types.REMOVE_COMPETITOR_SUCCESS,
        index
    }
}

export function addCompetitor(competitor) {
    console.log("ACTION::",competitor);
    return {
        type: types.ADD_COMPETITOR_SUCCESS,
        competitor
    }
}

