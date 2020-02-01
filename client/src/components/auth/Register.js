import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

/** Auth context */
import authContext from '../../context/auth/authContext';

/** Alert context */
import alertContext from '../../context/alert/alertContext';

const Register = props => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: ''
  });

  const { setAlert } = useContext(alertContext);
  const { register, error, clearErrors, isAuthenticated } = useContext(
    authContext
  );

  const { name, email, password, confPassword } = user;

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }
    if (error == 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  const handleSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else if (password.length < 6) {
      setAlert('Passwords should be at least 6 charachters', 'danger');
    } else if (password !== confPassword) {
      setAlert("Passwords don't match", 'danger');
    } else {
      register({ name, email, password });
    }
  };

  return (
    <Fragment>
      <div className='row justify-content-center mt-5'>
        <div className='col-6'>
          <div className='card'>
            <div className='card-body'>
              <h1 className='text-center'>
                User <span className='text-primary'>Register</span>
              </h1>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='name'>Name:</label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    className='form-control'
                    value={name}
                    onChange={handleChange}
                  />
                </div>
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
                <div className='form-group'>
                  <label htmlFor='password'>Confirm Password:</label>
                  <input
                    type='password'
                    name='confPassword'
                    id='confPassword'
                    className='form-control'
                    value={confPassword}
                    onChange={handleChange}
                  />
                </div>
                <button type='submit' class='btn btn-success btn-lg btn-block'>
                  Log in
                </button>
                <Link to='/login' className='btn btn-link btn-block btn-lg'>
                  Have an account already? Log in here.
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
