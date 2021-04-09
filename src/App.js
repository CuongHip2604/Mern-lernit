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
  const handleRedirec = () => {
    const token = localStorage.getItem("accessToken");
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
                return handleRedirec() ? (
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
                return handleRedirec() ? (
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
                return handleRedirec() ? (
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
    </div>
  );
}

export default App;
