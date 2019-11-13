import { createSelector } from 'reselect';

export function getLeagueState(state) {
    console.log("LEAGUESTATE::", state);
    if (state) {
        return state;
    }
}

export function getLeagueList(state) {
    console.log("LEAGUESTATE2::", state.length);
    if (!Array.isArray(state) || !state.length) {
    const reduceArray = state.reduce((reduceArray, obj) => {
        if (obj[Object.keys(obj)[0]].teamKeysTier1.split(",").length === 3 && obj[Object.keys(obj)[0]].teamKeysTier2.split(",").length === 6) {
          reduceArray.push(obj[Object.keys(obj)[0]]);
        }
        return reduceArray
      }, []);
    }
}

export function getSortedList(state) {
    console.log("LEAGUESTATE3::", state);
    const sorted = state.slice().sort((a, b) => a.score > b.score ? 1 : -1);
    sorted.map((x, index) => x.rank = index + 1)
    return sorted;
}

export function getLeagueRanking(state) {
    console.log("LEAGUESTATE4::", state);
    var rankLeague = []
    if (state) {
        for (var i = 0; i < state.length; i++) {
            rankLeague.push(state[i]);
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
        console.log("LEAGUESTATE2::", rankLeague);
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