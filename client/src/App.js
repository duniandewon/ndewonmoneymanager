import React, { Fragment, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

/** context API */
import NdewonState from './context/ndewon/NdewonState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

/** layout */
import Header from './layout/Header';
import Sidenav from './layout/Sidenav';
import Main from './layout/Main';
import Footer from './layout/Footer';
import Alerts from './layout/alerts';

/** pages */
import Dashboard from './Dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

/** Private route */
import PrivateRoute from './components/routing/PrivateRoute';

import setAuthToken from './utils/setAuthToken';

import './scss/styles.scss';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Fragment>
      <AuthState>
        <NdewonState>
          <AlertState>
            <Alerts />
            <Switch>
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <PrivateRoute path='/' component={Dashboard} />
            </Switch>
          </AlertState>
        </NdewonState>
      </AuthState>
    </Fragment>
  );
};

export default App;
