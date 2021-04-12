import React, { Suspense } from "react";
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import routes from "../../router";
import RouteWithSubRoutes from "../../router/RouteWitchSubRoutes";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "src/modules/authentication/store";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const WrapContent = styled.div`
  height: calc(100% - 4rem);
`;

function TheContent(props) {
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <main className="h-full">
      <div className="w-full h-full">
        <nav className="w-full h-16 shadow-lg bg-indigo-400 flex justify-between items-center sm:px-8 px-4 text-white sm:text-xl text-lg">
          <div>
            <Link to="/home">{"</>"} Learnit</Link>
          </div>
          <div className="flex justify-between items-center">
            <div className="sm:mr-4 mr-2">{currentUser.username}</div>
            <div className="sm:ml-4 ml-2 cursor-pointer" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </nav>
        <WrapContent>
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
        </WrapContent>
      </div>
    </main>
  );
}

export default TheContent;
