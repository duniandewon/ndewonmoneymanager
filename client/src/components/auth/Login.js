import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

/** Auth context */
import authContext from '../../context/auth/authContext';

/** Alert context */
import alertContext from '../../context/alert/alertContext';

const Login = props => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { setAlert } = useContext(alertContext);
  const { login, error, clearErrors, isAuthenticated } = useContext(
    authContext
  );

  const { email, password } = user;

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (email == '') {
      setAlert("Email shouldn't be emapty", 'danger');
    } else if (password == '') {
      setAlert("Password shouldn't be emapty", 'danger');
    } else {
      login({ email, password });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }

    if (error == 'Wrong password or email') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  return (
    <Fragment>
      <div className='row justify-content-center mt-5'>
        <div className='col-6'>
          <div className='card'>
            <div className='card-body'>
              <h1 className='text-center'>
                User <span className='text-primary'>Login</span>
              </h1>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='email'>Email:</label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='form-control'
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password:</label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    className='form-control'
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <button type='submit' class='btn btn-success btn-lg btn-block'>
                  Log in
                </button>
                <Link to='/register' className='btn btn-link btn-block btn-lg'>
                  Don't have an account? Register here.
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
