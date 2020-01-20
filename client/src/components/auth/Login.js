import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

/** Auth context */
import authContext from '../../context/auth/authContext';

/** Alert context */
import alertContext from '../../context/alert/alertContext';

/** Bootstrap components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      [e.target.id]: e.target.value
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
      props.history.push('/');
    }

    if (error == 'Wrong password or email') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  return (
    <Fragment>
      <h1 className='text-center'>
        User <span className='text-primary'>Login</span>
      </h1>
      <Row className='justify-content-center'>
        <Col xs={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                as='input'
                type='email'
                defaultValue={email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                as='input'
                type='password'
                defaultValue={password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant='success' type='submit' size='lg' block>
              Login
            </Button>
            <Link to='/register' className='btn btn-link btn-block btn-lg'>
              Don't have an account?
            </Link>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Login;
