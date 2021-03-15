import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import history from './history';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Profile from './screens/profile/profile';


function PrivateRoute ({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={() => sessionStorage.getItem('loggedIn') === "true"
        ? <Component />
        : <Redirect to={{pathname: '/login'}} />}
    />
  )
}

const AppRoutes = () => {
  return (
    <BrowserRouter history = {history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path='/home' component={Home} />
        <PrivateRoute path='/profile' component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoutes;
