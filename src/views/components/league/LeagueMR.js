var users = {
    'efbluh': {
     'profile': {
       profileName: 'bill',
       profilePic: 'https://blue',
       teamName: 'locals', 
     },
     'team': {
         'Lpphasd' : {
             competitorKey: 'a'
         }
     }
    },
    'fixbluh': {
     'profile': {
       profileName: 'bill',
       profilePic: 'https://blue',
       teamName: 'locals', 
     },
     'team': {
         'Lpphasd' : {
             competitorKey: 'a'
         },
         'asdsadasda' : {
             competitorKey: 'b'
         }
     }
    }
   };
 
 var ProfileRecord = Immutable.Record({
     profileName: '',
     profilePic: '',
     teamName: '', 
   });
 var teamRecord = Immutable.Record({
        competitorKey: ''
  });
 
 class User extends Immutable.Record({'profile': new ProfileRecord(), 'team':Immutable.Map()}) {
   constructor({profile, team} = {}) {
     super({team: Immutable.Map(team).map(x=>new teamRecord(x)), profile: new ProfileRecord(profile)})
   }
 }
 
 var userMap = Immutable.Map(users).map(x=>new User(x));
 
 // Verify that it's really a record
 console.log(userMap.get('efbluh').get('profile').profileName)
 console.log(userMap.get('fixbluh').toJS())
 console.log(userMap.get('fixbluh').get('team').toJS())