import React from "react";
import { Redirect, Route } from "react-router-dom";
import { addAuth } from "../AuthProvider";

function PublicRoute({ children, authInfo, ...rst }) {
  return (
    <Route
      {...rst}
      render={() => (authInfo.user ? <Redirect to="/users" /> : children)}
    />
  );
}

export default addAuth(PublicRoute);
