import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../../router";
import RouteWithSubRoutes from "../../router/RouteWitchSubRoutes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function TheContent(props) {
  return (
    <main>
      <div className="container">
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    name={route.name}
                    render={(props) => (
                      <RouteWithSubRoutes key={idx} {...route} />
                    )}
                  />
                )
              );
            })}
            <Redirect from="/" to="/home" />
          </Switch>
        </Suspense>
      </div>
    </main>
  );
}

export default TheContent;
