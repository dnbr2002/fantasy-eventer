import React, { useState, useLayoutEffect } from 'react';
import { Route, Redirect } from 'react-router-dom'

//Firebase
import { firebaseDb } from '../../../firebase';

function RequireAdminRoute({ component: Component, authenticated, id, ...rest }, props) {
    console.log("ADMINROUTEPROPS::", props)
    const [auth] = useState(authenticated);
    const [role, setRole] = useState("user");

    useLayoutEffect(
        () => {
            firebaseDb.ref(`users`).child(`${id}`).child(`${id}`).on('value', snapshot => {
                console.log("PROFILENAME::", snapshot.val());
                if (snapshot.exists()) {
                    setRole(snapshot.val().role);
                } else {

                }
            })
        }, [authenticated])

    return (
        <Route
            {...rest}
            render={props => {
                console.log("AUTH::", props)
                return auth && role === 'admin' ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{
                            pathname: '/',
                            state: { from: props.location }
                        }} />
                    )
            }}
        />
    );
}




export default RequireAdminRoute;
