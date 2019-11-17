import React from 'react';
import { Route, Redirect } from 'react-router-dom'


const RequireAuthRoute = ({component: Component, authenticated, id, ...rest}) => (
  <Route
    {...rest}
    render={props => {
      console.log("AUTH::", id)
      return authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/signin',
          state: {from: props.location}
        }}/>
      )
    }}
  />
);


export default RequireAuthRoute;
