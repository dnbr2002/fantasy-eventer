import { createSelector } from 'reselect';

var reduceArray = [];
var sorted = [];

export function getLeagueState(state) {
    console.log("LEAGUESTATE::", state);
    if (state) {
        return state;
    }
}

export function getLeagueList(state) {
    console.log("LEAGUESTATE2::", state);
    // if (!Array.isArray(state) || !state.length) {
        if (state.length > 0) {
        reduceArray = state.reduce((reduceArray, obj) => {
        if (obj[Object.keys(obj)[0]].teamKeysTier1.split(",").length === 3 && obj[Object.keys(obj)[0]].teamKeysTier2.split(",").length === 6) {
          reduceArray.push(obj[Object.keys(obj)[0]]);
        }
        console.log("LEAGUESTATE3::", reduceArray);
        return reduceArray
      }, []);
    }
}

export function getSortedList() {
    sorted = reduceArray.slice().sort((a, b) => a.score > b.score ? 1 : -1);
    sorted.map((x, index) => x.rank = index + 1)
    console.log("LEAGUESTATE4::", sorted);
    return sorted;
}

export function getLeagueRanking() {
    console.log("LEAGUESTATE5::", sorted);
    var rankLeague = []
    if (sorted) {
        for (var i = 0; i < sorted.length; i++) {
            rankLeague.push(sorted[i]);
        }
        for (var k = 0; k < rankLeague.length; k++) {
            for (var h = 1; h < rankLeague.length + 1; h++) {
                if (rankLeague[k + h] !== undefined) {
                    if (rankLeague[k + h].tie !== true) {
                        if (rankLeague[k].score === rankLeague[h + k].score) {
                            rankLeague[k].rank = k + 1;
                            rankLeague[h + k].rank = k + 1;
                            rankLeague[k].tie = true;
                            rankLeague[h + k].tie = true;
                        }
                    }
                }
            }
        }
        console.log("LEAGUESTATE6::", rankLeague);
        return rankLeague;
    }
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const LeagueSelector = createSelector(
    getLeagueState,
    getLeagueList,
    getSortedList,
    getLeagueRanking,
);