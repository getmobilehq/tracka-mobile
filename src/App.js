import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "./utils/toast";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import PrivateRoute from "./components/login/PrivateRoute";
import ComposeProviders from "./utils/composeProviders";
import { SidebarProvider } from "./context/SidebarContext";
import ProjectsProvider from "./context/Projects";
import AllocationsProvider from "./context/Allocations";

const Layout = lazy(() => import("./layout/Layout.js"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ForgetPassword = lazy(() => import("./pages/ForgotPassword.js"));
const ConfirmPassword = lazy(() => import("./pages/ConfirmPassword.js"));

const App = () => {
  const components = [SidebarProvider, ProjectsProvider, AllocationsProvider];

  return (
    <ComposeProviders components={components}>
      <ToastContainer />
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgot-password" component={ForgetPassword} />
          <Route path="/confirm-password/:token" component={ConfirmPassword} />

          <PrivateRoute>
            <Route path="/" component={Layout} />
          </PrivateRoute>
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>
    </ComposeProviders>
  );
};

export default App;
