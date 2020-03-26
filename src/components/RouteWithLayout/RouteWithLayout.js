import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../../utils/auth';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

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

  return (
    <Route
      {...rest}
      render={matchProps => (
        isAuthenticated() ? (
            <Layout>
              <Component {...matchProps} />
            </Layout>
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
