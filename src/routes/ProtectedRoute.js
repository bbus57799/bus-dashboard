import React from "react";
import { Redirect, Route } from "react-router-dom";
import { addAuth } from "../AuthProvider";

function ProtectedRoute({ children, authInfo, ...rst }) {
  return (
    <Route
      {...rst}
      render={() => (authInfo.user ? children : <Redirect to="/login" />)}
    />
  );
}

export default addAuth(ProtectedRoute);
