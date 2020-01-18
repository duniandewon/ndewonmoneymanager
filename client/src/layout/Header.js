import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

/** Bootstrap Components */
import Button from 'react-bootstrap/Button';

const Header = ({ sideNav, setSideNav }) => {
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
        <Button variant='primary' onClick={() => alert('logged out')}>
          <i className='fas fa-sign-out-alt' />
        </Button>
      </header>
    </Fragment>
  );
};

export default Header;
