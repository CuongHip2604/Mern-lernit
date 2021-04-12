import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import history from "./router/history";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Loading from "./shared/plugins/loading";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Login = React.lazy(() => import("./modules/authentication/pages/Login"));
const Register = React.lazy(() =>
  import("./modules/authentication/pages/Register")
);
const TheContent = React.lazy(() => import("./shared/containers/TheContent"));

function App() {
  const token = useSelector((state) => state.authentication.accessToken);
  const isLoading = useSelector((state) => state.root.loading);

  const handleRedirect = () => {
    if (!token) return false;
    return true;
  };

  return (
    <div className="h-full">
      <Router history={history}>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login page"
              render={(props) => {
                return handleRedirect() ? (
                  <Redirect to="/" />
                ) : (
                  <Login {...props} />
                );
              }}
            />
            <Route
              exact
              path="/register"
              name="Register page"
              render={(props) => {
                return handleRedirect() ? (
                  <Redirect to="/" />
                ) : (
                  <Register {...props} />
                );
              }}
            />
            <Route
              path="/"
              name="Container"
              render={(props) => {
                return handleRedirect() ? (
                  <TheContent {...props} />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
          </Switch>
        </React.Suspense>
      </Router>
      <ToastContainer />
      <Loading loading={isLoading} />
    </div>
  );
}

export default App;
