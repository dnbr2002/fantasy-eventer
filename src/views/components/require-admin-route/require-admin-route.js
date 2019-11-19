import React, { Component, useState, useEffect, useLayoutEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { render } from 'react-dom'

//Firebase
import { firebaseDb } from '../../../firebase';

// class RequireAdminRoute extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             role: "user",
//         };
//     }

//     componentDidMount() {
//         firebaseDb.ref(`users`).child(`${this.props.id}`).child(`${this.props.id}`).on('value', snapshot => {
//             console.log("ADMINAUTH::", snapshot.val());
//             if (snapshot.exists()) {
//                 console.log("ADMINAUTH2::", snapshot.val().role);
//                 this.setState({ role: snapshot.val().role });
//             }
//         }
//         )

//     }

//     componentWillMount() {

//     }

//     //     getRole = (id) => {
//     //     firebaseDb.ref(`users`).child(`${id}`).child(`${id}`).on('value', snapshot => {
//     //         console.log("ADMINAUTH::", snapshot.val());
//     //         if (snapshot.exists()) {
//     //             console.log("ADMINAUTH2::", snapshot.val().role);
//     //             this.setState({ role: snapshot.val().role });
//     //         }
//     //     }
//     //     )
//     // }

//     render() {
//         console.log("RAR::", this.props);
//         console.log("RAR::2", this.state);
//         const { authenticated, location } = this.props;
//         return (
//             <Route {...this.props.rest} render={props => {
//                 console.log("ADMINAUTH1::", this.state.role);
//                 return authenticated && this.state.role === 'admin' ? (
//                     <Component {...props} />
//                 ) : (
//                         <Redirect to={{
//                             pathname: '/',
//                             state: { from: location }
//                         }} />
//                     )
//             }}
//             />
//         )
//     }
// }


const getRole = (id) => {
    firebaseDb.ref(`users`).child(`${id}`).child(`${id}`).on('value', snapshot => {
        console.log("ADMINAUTH::", snapshot.val());
        if (snapshot.exists()) {
            console.log("ADMINAUTH::2", snapshot.val().role);
            return snapshot.val().role
        }
    }
    )
}

const RequireAdminRoute = ({ component: Component, authenticated, role, ...rest }) => (
    <Route
    {...rest}
    render={props => {
      console.log("AUTH::", role)
      return authenticated && role == "admin" ? (
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

//     // console.log("ADMINAUTH::::", props)\
//     const [auth] = useState(authenticated);
//     const [role, setRole] = useState(null);

//     useEffect(
//         () => {
//             setRole(getRole(id));
//         }, [])

//         const getRole = (id) => {
//             firebaseDb.ref(`users`).child(`${id}`).child(`${id}`).on('value', snapshot => {
//                 console.log("ADMINAUTH::", snapshot.val());
//                 if (snapshot.exists()) {
//                     console.log("ADMINAUTH::2", snapshot.val().role);
//                     // setRole(getRole(id));
//                     return snapshot.val().role
//                 }
//             }
//             )
//         }


//     return (
//         <Route
//             {...rest}
//             render={props => {
//                 return auth && role2 === 'admin' ? (
//                     <Component {...props} />
//                 ) : (
//                         <Redirect to={{
//                             pathname: '/',
//                             state: { from: props.location }
//                         }} />
//                     )
//             }}
//         /> 


//     );
// }

export default RequireAdminRoute;
