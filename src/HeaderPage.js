import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import LoginPage from "./login/LoginPage";
import { BrowserRouter as Router, Link, Switch } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./home/HomePage";
import UsersDashboard from "./users-dashboard/UsersDashboard";
import BusPage from "./bus-page/BusPage";
import { addAuth } from "./AuthProvider";
import AdminRoute from "./routes/AdminRoute";

function HeaderPage({ authInfo }) {
  return (
    <div>
      <Router>
        {authInfo.user && (
          <Navbar bg="dark" variant="dark">
            <Container>
              <Link className="navbar-brand" to="/">
                Bus Dashboard
              </Link>
              <Nav className="mr-auto">
                <Link className="nav-link" to="/">
                  Buses
                </Link>
                {authInfo.user.role === "admin" && (
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                )}
              </Nav>
              <Nav className="mr-auto">
                <Link className="nav-link" to="" onClick={authInfo.logout}>
                  Logout
                </Link>
              </Nav>
            </Container>
          </Navbar>
        )}

        <Switch>
          <PublicRoute path="/login">
            <LoginPage />
          </PublicRoute>
          <AdminRoute path="/users">
            <UsersDashboard />
          </AdminRoute>
          <ProtectedRoute path="/buses/:busId">
            <BusPage />
          </ProtectedRoute>
          <ProtectedRoute path="/">
            <HomePage />
          </ProtectedRoute>
        </Switch>

        {authInfo.user && (
          <Navbar
            className="justify-content-center"
            fixed="bottom"
            bg="dark"
            variant="dark"
          >
            <span className="text-light">Bus Dashboard 2021</span>
          </Navbar>
        )}
      </Router>
    </div>
  );
}

export default addAuth(HeaderPage);
