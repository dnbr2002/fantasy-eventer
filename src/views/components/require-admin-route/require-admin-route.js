import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// //Firebase
// import { firebaseDb } from '../../../firebase';


// const getRole = (id) => {
//     firebaseDb.ref(`users`).child(`${id}`).child(`${id}`).on('value', snapshot => {
//         console.log("ADMINAUTH::", snapshot.val());
//         if (snapshot.exists()) {
//             console.log("ADMINAUTH::2", snapshot.val().role);
//             return snapshot.val().role
//         }
//     }
//     )
// }

const RequireAdminRoute = ({ component: Component, authenticated, id, role, ...rest }) => (
    <Route
    {...rest}
    render={props => {
      console.log("AUTH::", id)
      return authenticated && id === "s9DolMTaZuWDntFEA5KBlE2Wc2o1" ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/',
          state: {from: props.location}
        }}/>
      )
    }}
  />
);

export default RequireAdminRoute;
