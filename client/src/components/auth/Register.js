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
      props.history.push('/');
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
      <h1 className='text-center'>
        Create <span className='text-primary'>Account</span>
      </h1>
      <Row className='justify-content-center'>
        <Col xs={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                as='input'
                type='text'
                defaultValue={name}
                onChange={handleChange}
                name='name'
              />
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                as='input'
                type='email'
                defaultValue={email}
                onChange={handleChange}
                name='email'
              />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                as='input'
                type='password'
                defaultValue={password}
                onChange={handleChange}
                name='password'
              />
            </Form.Group>
            <Form.Group controlId='confPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                as='input'
                type='password'
                defaultValue={confPassword}
                onChange={handleChange}
                name='confPassword'
              />
            </Form.Group>
            <Button variant='success' type='submit' size='lg' block>
              Register
            </Button>
            <Link to='/login' className='btn btn-link btn-block btn-lg'>
              Already have an account?
            </Link>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Register;
