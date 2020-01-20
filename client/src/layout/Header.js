import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

/** Auth context */
import authContext from '../context/auth/authContext';

const Header = ({ sideNav, setSideNav }) => {
  const { logout, isAuthenticated } = useContext(authContext);
  return (
    <Fragment>
      <header className='header'>
        <Link to='/' className='site-logo' style={{ color: '#fff' }}>
          <h1>Ndewon Admin Dashboard</h1>
        </Link>
        <div
          className='sidenav__toggler'
          onClick={() => sideNav === '' && setSideNav('active')}
        >
          <i className='fas fa-bars' />
        </div>
        {isAuthenticated && (
          <Link className='btn btn-primary' onClick={() => logout()}>
            <i className='fas fa-sign-out-alt' />
          </Link>
        )}
      </header>
    </Fragment>
  );
};

export default Header;
