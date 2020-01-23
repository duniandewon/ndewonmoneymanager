import React, { Fragment, useState, useContext, useEffect } from 'react';

/** Auth context */
import authContext from '../context/auth/authContext';

/** Ndewon Context */
import ndewonContext from '../context/ndewon/ndewonContext';

/** Bootsrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

/** Ndewon Components */
import BankForm from '../components/banks/BankForm';
import BankItem from '../components/banks/BankItem';
import BankFilter from '../components/banks/BankFilter';

const Banks = () => {
  const { loadUser } = useContext(authContext);

  const { loading, banks, getBanks } = useContext(ndewonContext);

  const [form, setForm] = useState(false);

  const handleClose = () => setForm(false);
  const handleShow = () => setForm(true);

  useEffect(() => {
    loadUser();
    getBanks();
  }, []);

  return (
    <Fragment>
      <Row>
        <BankFilter handleShow={handleShow} />
      </Row>
      <Row>
        {banks && !loading ? (
          <Col>
            <BankItem
              show={form}
              handleClose={handleClose}
              handleShow={handleShow}
            />
          </Col>
        ) : (
          <Col className='d-flex justify-content-center'>
            <Spinner animation='grow' variant='dark' />
          </Col>
        )}
      </Row>
      <BankForm show={form} handleClose={handleClose} />
    </Fragment>
  );
};

export default Banks;
