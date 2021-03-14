import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import history from './history';
import Home from './screens/home/Home';
import Login from './screens/login/Login';

const AppRoutes = () => {
  return (
    <BrowserRouter history = {history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoutes;
