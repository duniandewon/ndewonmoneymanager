import React, { Fragment, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

/** context API */
import NdewonState from './context/ndewon/NdewonState';
import AuthState from './context/auth/AuthState';

/** layout */
import Header from './layout/Header';
import Sidenav from './layout/Sidenav';
import Main from './layout/Main';
import Footer from './layout/Footer';

/** pages */
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Transactions from './pages/Transactions';
import Banks from './pages/Banks';
import Reports from './pages/Reports';

import './scss/styles.scss';

const App = () => {
  const [sideNav, setSideNav] = useState('');
  return (
    <Fragment>
      <AuthState>
        <NdewonState>
          <div className='wrapper'>
            <Header setSideNav={setSideNav} sideNav={sideNav} />
            <Sidenav sideNav={sideNav} setSideNav={setSideNav} />
            <Main>
              <Switch>
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
        </NdewonState>
      </AuthState>
    </Fragment>
  );
};

export default App;
