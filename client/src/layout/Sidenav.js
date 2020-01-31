import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

/** Auth context */
import authContext from '../context/auth/authContext';

/** Ndewon context */
import ndewonContext from '../context/ndewon/ndewonContext';

const Sidenav = ({ sideNav, setSideNav }) => {
  const { user, logout } = useContext(authContext);

  const { clearState } = useContext(ndewonContext);

  const handleLogout = () => {
    setSideNav('');
    logout();
    clearState();
  };

  return (
    <Fragment>
      <aside className={`sidenav ${sideNav}`}>
        <div className='sidenav__header'>
          <div className='sidenav__header-img'>
            <img src='//unsplash.it/100/100' alt='user profile image' />
          </div>
          <p className='sidenav__header-info'>
            <span className='sidenav__header-info--name'>
              {user && user.name}
            </span>
            <span className='sidenav__header-info--position'>
              Chief Executive Officer
            </span>
          </p>
        </div>
        <ul className='main-nav'>
          <li className='main-nav__item'>
            <Link
              to='/dashboard'
              className='main-nav__link active'
              onClick={() => setSideNav('')}
            >
              <i className='fas fa-tachometer-alt' />
              <span className='main-nav__link--text'>Dashboard</span>
            </Link>
          </li>
          <li className='main-nav__item'>
            <Link
              to='/categories'
              className='main-nav__link'
              onClick={() => setSideNav('')}
            >
              <i className='fas fa-folder' />
              <span className='main-nav__link--text'>Categories</span>
            </Link>
          </li>
          <li className='main-nav__item'>
            <Link
              to='/transactions'
              className='main-nav__link'
              onClick={() => setSideNav('')}
            >
              <i className='fas fa-folder' />
              <span className='main-nav__link--text'>Transactions</span>
            </Link>
          </li>
          <li className='main-nav__item'>
            <Link
              to='/banks'
              className='main-nav__link'
              onClick={() => setSideNav('')}
            >
              <i className='fas fa-building' />
              <span className='main-nav__link--text'>Banks</span>
            </Link>
          </li>
          <li className='main-nav__item'>
            <Link
              to='/reports'
              className='main-nav__link'
              onClick={() => setSideNav('')}
            >
              <i className='fas fa-chart-pie' />
              <span className='main-nav__link--text'>Reports</span>
            </Link>
          </li>
          <li className='main-nav__item'>
            <Link to='#' className='main-nav__link' onClick={handleLogout}>
              <i class='fas fa-power-off'></i>
              <span className='main-nav__link--text'>Log Out</span>
            </Link>
          </li>
        </ul>
      </aside>
    </Fragment>
  );
};

export default Sidenav;
