import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { state } = useAuthContext();
  const { adminInfo } = state;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        adminInfo?.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
