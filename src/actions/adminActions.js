import * as types from './actionTypes';
import { Record } from 'immutable';
import { FirebaseList } from 'src/firebase';
import { firebaseDb } from '../firebase';
import toastr from 'toastr';
// import _ from 'lodash';
import toArray from 'lodash/toArray';

export const Competitor = new Record({
  horse: null,
  rider: null,
  tier: 2,
  pic: null,
  country: null,
  score: 0,
  description: null,
  key: null,
});

export const competitorList = new FirebaseList({
  onAdd: createCompetitorSuccess,
  onChange: updateCompetitorSuccess,
  onLoad: loadCompetitorsSuccess,
  onRemove: removeCompetitorSuccess
}, Competitor);

// export const competitorList2 = new FirebaseList({
//   onRemove: removeCompetitorsSuccess
// }, Competitor);

export function loadCompetitors() {
  return (dispatch, getState) => {
    // const { auth } = getState();
    competitorList.path = `competitors/`;
    competitorList.subscribe(dispatch);
  };
}

export function loadCompetitorsSuccess(competitors) {
  // console.log("ACLOAD::", competitors);
  return {
    type: types.LOAD_COMPETITORS_SUCCESS,
    payload: competitors
  };
}

export function loadCompetitorsError(error) {
  //   console.log('ERROR::',error)
  return {
    type: types.LOAD_COMPETITORS_ERROR,
    payload: error
  };
}

export function createCompetitor(competitor) {
  var horse = competitor.horse;
  var rider = competitor.rider;
  var tier = competitor.tier;
  var pic = competitor.pic;
  var country = competitor.country;
  var score = competitor.score;
  var description = competitor.description;
  return dispatch => {
    competitorList.path = `competitors/`;
    competitorList.push({ tier, horse, rider, pic, country, score, description })
      .catch(error => dispatch(createCompetitorError(error)));
  };
}

export function createCompetitorSuccess(competitor) {
  // console.log("ACTION_CREATECOMESTARTSUCCESS::", competitor)
  return {
    type: types.CREATE_COMPETITOR_SUCCESS,
    payload: competitor
  };
}

export function createCompetitorError(error) {
  //  console.log("ACTION_CREATECOMESTARTERROR::", error)
  return {
    type: types.CREATE_COMPETITOR_ERROR,
    payload: error
  };
}

export function updateCompetitor(competitorKey, competitor) {
  console.log('CHANGES::', competitor);
  console.log('KEY::', competitorKey);
  return dispatch => {
    competitorList.update(competitorKey, competitor)
      .catch(error => dispatch(updateCompetitorError(error)));
  };
}

export function updateCompetitorSuccess(competitor) {
  // console.log('COMPETITORS::', competitors);
  return {
    type: types.UPDATE_COMPETITOR_SUCCESS,
    payload: competitor
  };

}

export function updateCompetitorError(error) {
  return {
    type: types.UPDATE_COMPETITOR_ERROR,
    payload: error
  };
}

export function filterCompetitors(filterType) {
  return {
    type: types.FILTER_COMPETITORS,
    payload: { filterType }
  };
}

// export function removeCompetitors(competitors) {
//   // console.log('REMOVECOMPETITORKEY::', competitors)
//   return dispatch => {
//     competitors.forEach(competitor => {
//       console.log('KEY::', competitor.key)
//       competitorList2.remove(competitor.key)
//         .catch(error => dispatch(removeCompetitorsError(error)));
//     })
//   };
// }

// export function removeCompetitorsSuccess(competitor) {
//   // console.log('REMOVECOMPETITORSUCCESS::', competitor)
//   return {
//     type: types.REMOVE_COMPETITORS_SUCCESS,
//     payload: competitor
//   };
// }

// export function removeCompetitorsError(error) {
//   // console.log('REMOVECOMPETITORERROR::', error)
//   return {
//     type: types.REMOVE_COMPETITORS_ERROR,
//     payload: error
//   };
// }

export function removeCompetitor(competitor) {
  // console.log('REMOVECOMPETITORKEY::', competitor)
  return dispatch => {
    competitorList.remove(competitor.value.key)
      .catch(error => dispatch(removeCompetitorError(error)));
  };
}

export function removeCompetitorSuccess(competitor) {
  // console.log('REMOVECOMPETITORSUCCESS::', competitor)
  return {
    type: types.REMOVE_COMPETITOR_SUCCESS,
    payload: competitor
  };
}

export function removeCompetitorError(error) {
  //  console.log('REMOVECOMPETITORERROR::', error)
  return {
    type: types.REMOVE_COMPETITOR_ERROR,
    payload: error
  };
}

// export function bulkRemoveCompetitors(competitors) {
//   return dispatch => {
//     var teamcounter = 0;
//     var compcounter = 0
//     const ref = firebaseDb.ref('users');
//     ref.once('value').then(snapshot => {
//       const users = snapshot.val();
//       for (var user_id in users) {
//         const team = users[user_id].team;
//         for (var tm_id in team) {
//           teamcounter++
//           // eslint-disable-next-line
//           if (competitors.some(comp => comp.key === team[tm_id].competitorKey)) {
//             compcounter++
//             firebaseDb.ref(`users/${user_id}/team/${tm_id}`)
//               .set(null);
//           }
//         }
//       }
//       toastr.success("Checked " + teamcounter + " teams.  Found and removed " + compcounter + " matches.");
//     });
//   }
// }

export function bulkRemoveCompetitor(competitor) {
  return dispatch => {
    var teamcounter = 0;
    const ref = firebaseDb.ref('users');
    ref.once('value').then(snapshot => {
      const users = snapshot.val();
      for (var user_id in users) {
        // eslint-disable-next-line
        return firebaseDb.ref(`users/${user_id}/${user_id}`).once('value').then(function (snapshot) {
          var t1 = snapshot.val().teamKeysTier1.split(",")
          var t2 = snapshot.val().teamKeysTier2.split(",")
          const newTeam1 = t1.filter(tm1 => tm1 !== competitor.value.key)
          const newTeam2 = t2.filter(tm2 => tm2 !== competitor.value.key)
          console.log("NEWTEAM::", newTeam1);
          var profilerec = firebaseDb.ref(`users/${user_id}/${user_id}`)
          profilerec.child('teamKeysTier1').set(newTeam1.toString());
          profilerec.child('teamKeysTier2').set(newTeam2.toString());
        })
      };
      toastr.success("Checked " + teamcounter + " teams.");
    });
  }
}


export function bulkRemoveTeams() {
  return dispatch => {
    var counter = 0;
    const ref = firebaseDb.ref('users');
    ref.once('value').then(snapshot => {
      const users = snapshot.val();
      for (var user_id in users) {
        counter++
        console.log("count::", counter)
        var profilerec = firebaseDb.ref(`users/${user_id}/${user_id}`)
        profilerec.child('teamKeysTier1').set('PH');
        profilerec.child('teamKeysTier2').set('PH');
      }
      toastr.success("Removed " + counter + " teams");
    })
  }
}

export function bulkUpdateScores(competitors) {
  return dispatch => {
    const ref = firebaseDb.ref('users');
    ref.once('value').then(snapshot => {
      const users = toArray(snapshot.val());
      console.log("USERS::", users);
      users.forEach(user_id => {
        const record = user_id[Object.keys(user_id)[0]];
        var teamstring = record.teamKeysTier1 + ',' + record.teamKeysTier2
        var team = teamstring.split(',');
        // eslint-disable-next-line
        let totalScores = []
        team.map(key => {
          // eslint-disable-next-line
          competitors.map(competitor => {
            if (key === competitor.key) {
              totalScores.push(Number(competitor.score))
            }
          })
        })
        const sum = totalScores.reduce((total, value) => total + value, 0);
        firebaseDb.ref(`users/${record.uid}/${record.uid}/score`).set(sum.toString());
        toastr.success("Users Scores Updated");
      })
    });
  }
};



// export function bulkUpdateScores(competitors) {
//   debugger;

//   var snapArray = firebaseDb.ref('users').once('value').then(snapshot => {
//     snapArray = _.toArray(snapshot.val());    
//   })

//   return snapArray;

//  };







