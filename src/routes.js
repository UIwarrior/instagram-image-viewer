import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Profile from './screens/profile/profile';


const AppRoutes = () => {
  return (
    <Router history = {history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route path='/home' component={Home}/>
        <Route path='/profile' component={Profile}/>
      </Switch>
    </Router>
  );
};

export default AppRoutes;
