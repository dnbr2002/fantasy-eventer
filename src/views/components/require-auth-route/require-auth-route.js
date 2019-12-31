import React from 'react';
import { Route, Redirect } from 'react-router-dom'


const RequireAuthRoute = ({component: Component, authenticated, ...rest}) => (
  <Route
    {...rest}
    render={props => {
      // console.log("AUTH::", authenticated)
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
