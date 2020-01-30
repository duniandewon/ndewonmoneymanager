import React, { Fragment, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

/** pages */
import Home from './pages/Home';
import Categories from './pages/Categories';
import Transactions from './pages/Transactions';
import Banks from './pages/Banks';
import Reports from './pages/Reports';

/** layout */
import Header from './layout/Header';
import Sidenav from './layout/Sidenav';
import Main from './layout/Main';
import Footer from './layout/Footer';
import Alerts from './layout/alerts';

/** Private route */
import PrivateRoute from './components/routing/PrivateRoute';

const Dashboard = () => {
  const [sideNav, setSideNav] = useState('');
  return (
    <Fragment>
      <div className='wrapper'>
        <Header setSideNav={setSideNav} sideNav={sideNav} />
        <Sidenav sideNav={sideNav} setSideNav={setSideNav} />
        <Main>
          <Alerts />
          <Switch>
            <PrivateRoute path='/dashboard' component={Home} />
            <PrivateRoute path='/categories' component={Categories} />
            <PrivateRoute path='/transactions' component={Transactions} />
            <PrivateRoute path='/banks' component={Banks} />
            <PrivateRoute path='/reports' component={Reports} />
          </Switch>
        </Main>
        <Footer />
      </div>
      {/** ./wrapper */}
    </Fragment>
  );
};

export default Dashboard;
