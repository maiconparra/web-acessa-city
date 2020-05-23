import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../../utils/auth';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, permission, ...rest } = props;

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/sign-in", state: { from: props.location } }} />
        )
      }
    />
  );  


  const handleRender = (matchProps) => {
    if (isAuthenticated()) {
      if (permission) {
        return (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )
      }
      else {
        return (
          <Redirect to={{ pathname: "/not-found", state: { from: props.location } }} />
        )
      }
    }
    else {
      return (
        <Redirect to={{ pathname: "/sign-in", state: { from: props.location } }} />
      )      
    }
  }

  return (
    <Route
      {...rest}
      render={matchProps => (

        
        isAuthenticated() ? (
          // roles == '49236e08-3e33-4467-9bdf-1381fa4ec91e' ? (
          handleRender(matchProps)
        ) : (
          <Redirect to={{ pathname: "/sign-in", state: { from: props.location } }} />
        )        
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
