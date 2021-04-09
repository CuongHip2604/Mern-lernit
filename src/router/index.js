import React from "react";
import modulesRoutes from "./modules";

const Home = React.lazy(() => import("../shared/pages/Home"));

let routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/home", name: "Home", component: Home },
];

function configRoutes() {
  if (modulesRoutes && Object.values(modulesRoutes).length) {
    let allRoutes = new Set();
    Object.values(modulesRoutes).forEach((routes) => {
      routes.forEach((route) => {
        allRoutes.add(route);
      });
    });

    return [...Array.from(allRoutes), ...routes];
  }

  return [...routes];
}

routes = configRoutes();

export default routes;
