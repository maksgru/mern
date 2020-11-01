import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { auth } from "./pages/auth";
import { getJwt } from "./helpers";

const jwt = getJwt();

export default class App extends Component {
  
  render() {
    const authPages = auth(jwt);
    return <BrowserRouter>{authPages}</BrowserRouter>;
  }
}
