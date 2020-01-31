import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

/** Auth context */
import authContext from '../context/auth/authContext';

/** Ndewon context */
import ndewonContext from '../context/ndewon/ndewonContext';

const Header = ({ sideNav, setSideNav }) => {
  const { logout } = useContext(authContext);

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
        <div
          className='sidenav__toggler d-lg-none'
          onClick={() =>
            sideNav === '' ? setSideNav('active') : setSideNav('')
          }
        >
          <i className='fas fa-bars' />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
