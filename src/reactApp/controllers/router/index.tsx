import React, { useEffect, useState } from "react";

import { Redirect } from "react-router";
import { HashRouter, Route, Switch } from "react-router-dom";

import {  Error404 } from "../../views";


const routes = [
  { path: "/", exact: true, component: Error404 },
];

function Router(props) {

  const RouteRender = ({
    Component,
    auth,
    ...rest
  }: {
    Component?: any;
    auth?: boolean;
    rest?: any;
  }) => {
    return (<><Route component={Component} {...rest} /></>)
  };

  return (
    <div className="full bg router">
      <HashRouter basename="/">
              <Switch>
                {routes.map((route) => (
                  <RouteRender {...route} key={route.path} />
                ))}
                <Redirect from="*" to="/" />
              </Switch>
      </HashRouter>
    </div>
  );
}

export default Router;
