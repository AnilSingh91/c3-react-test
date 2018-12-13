import React from "react";
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { PearsonUsers } from "./components/PearsonUsers";

export const App = () => (
  <BrowserRouter>
    <main>
      <Redirect exact from="" to={'/users'} />
      <Route path='/users' component={PearsonUsers} />
    </main>
  </BrowserRouter>
);
