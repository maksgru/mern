import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";


export function auth(isAuth) {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/main" component={Main} />
        <Redirect to="/main" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Redirect to="/" />
    </Switch>
  );
}
