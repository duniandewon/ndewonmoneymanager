import React, { Fragment, useState, useContext, useEffect } from 'react';

/** Auth context */
import authContext from '../context/auth/authContext';

/** Ndewon Context */
import ndewonContext from '../context/ndewon/ndewonContext';

/** Bootsrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

/** Ndewon Components */
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionItem from '../components/transactions/TransactionItem';
import TransactionFilter from '../components/transactions/TransactionFilter';

const Transactions = () => {
  const { loadUser } = useContext(authContext);

  const {
    transactions,
    getCategories,
    getBanks,
    getTransactions,
    loading
  } = useContext(ndewonContext);

  const [form, setForm] = useState(false);

  const handleClose = () => setForm(false);
  const handleShow = () => setForm(true);

  useEffect(() => {
    loadUser();
    getCategories();
    getBanks();
    getTransactions();
  }, []);

  return (
    <Fragment>
      <Row>
        <TransactionFilter handleShow={handleShow} />
      </Row>
      <Row>
        {transactions !== null && !loading ? (
          <Col>
            <Card>
              <TransactionItem
                show={form}
                handleClose={handleClose}
                handleShow={handleShow}
              />
            </Card>
          </Col>
        ) : (
          <Col className='d-flex justify-content-center'>
            <Spinner animation='grow' variant='dark' />
          </Col>
        )}
      </Row>
      <TransactionForm show={form} handleClose={handleClose} />
    </Fragment>
  );
};

export default Transactions;
