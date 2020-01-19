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
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Transactions from './pages/Transactions';
import Banks from './pages/Banks';
import Reports from './pages/Reports';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './scss/styles.scss';
import Alert from 'react-bootstrap/Alert';

const App = () => {
  const [sideNav, setSideNav] = useState('');
  return (
    <Fragment>
      <AuthState>
        <NdewonState>
          <AlertState>
            <div className='wrapper'>
              <Header setSideNav={setSideNav} sideNav={sideNav} />
              <Sidenav sideNav={sideNav} setSideNav={setSideNav} />
              <Main>
                <Alerts />
                <Switch>
                  <Route path='/register' component={Register} />
                  <Route path='/login' component={Login} />
                  <Route exact path='/' component={Dashboard} />
                  <Route path='/categories' component={Categories} />
                  <Route path='/transactions' component={Transactions} />
                  <Route path='/banks' component={Banks} />
                  <Route path='/reports' component={Reports} />
                </Switch>
              </Main>
              <Footer />
            </div>
            {/** ./wrapper */}
          </AlertState>
        </NdewonState>
      </AuthState>
    </Fragment>
  );
};

export default App;
