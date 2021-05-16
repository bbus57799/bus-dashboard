import React from "react";
import { Redirect, Route } from "react-router-dom";
import { addAuth } from "../AuthProvider";

function ProtectedRoute({ children, authInfo, ...rst }) {
  return (
    <Route
      {...rst}
      render={() =>
        authInfo.user ? (
          authInfo.user.role === "admin" ? (
            children
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default addAuth(ProtectedRoute);
