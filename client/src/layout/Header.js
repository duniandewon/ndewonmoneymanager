import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

/** Auth context */
import authContext from '../context/auth/authContext';

/** Ndewon context */
import ndewonContext from '../context/ndewon/ndewonContext';

const Header = ({ sideNav, setSideNav }) => {
  const { logout, isAuthenticated } = useContext(authContext);

  const { clearState } = useContext(ndewonContext);

  const handleLogout = () => {
    logout();
    clearState();
  };

  return (
    <Fragment>
      <header className='header'>
        <Link to='/dashboard' className='site-logo' style={{ color: '#fff' }}>
          <h1>Ndewon Admin Dashboard</h1>
        </Link>
        {isAuthenticated && (
          <Fragment>
            <div
              className='sidenav__toggler'
              onClick={() => sideNav === '' && setSideNav('active')}
            >
              <i className='fas fa-bars' />
            </div>
            <Link to='#' className='btn btn-primary' onClick={handleLogout}>
              <i className='fas fa-sign-out-alt' />
            </Link>
          </Fragment>
        )}
      </header>
    </Fragment>
  );
};

export default Header;
