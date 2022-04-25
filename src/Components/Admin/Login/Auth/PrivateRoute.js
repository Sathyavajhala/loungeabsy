import React from "react";
import { Route, Redirect } from "react-router-dom";
import store from "../../../../Store/store";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      store.getState().login.isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/admin/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
