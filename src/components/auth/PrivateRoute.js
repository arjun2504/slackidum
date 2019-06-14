import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => localStorage.getItem('token') !== null
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location, is_logged_in: false }}} />}
    />
  )
}

export default PrivateRoute