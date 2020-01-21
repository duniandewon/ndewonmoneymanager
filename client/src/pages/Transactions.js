import React, { Fragment, useState, useContext, useEffect } from 'react';

/** Auth context */
import authContext from '../context/auth/authContext';

/** Ndewon Context */
import ndewonContext from '../context/ndewon/ndewonContext';

/** Bootsrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

/** Ndewon Components */
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionItem from '../components/transactions/TransactionItem';
import TransactionFilter from '../components/transactions/TransactionFilter';

const Transactions = () => {
  const { loadUser } = useContext(authContext);

  const { getCategories } = useContext(ndewonContext);

  const [form, setForm] = useState(false);

  const handleClose = () => setForm(false);
  const handleShow = () => setForm(true);

  useEffect(() => {
    loadUser();
    getCategories();
  }, []);

  return (
    <Fragment>
      <Row>
        <TransactionFilter handleShow={handleShow} />
      </Row>
      <Row>
        <Col>
          <Card>
            <TransactionItem
              show={form}
              handleClose={handleClose}
              handleShow={handleShow}
            />
          </Card>
        </Col>
      </Row>
      <TransactionForm show={form} handleClose={handleClose} />
    </Fragment>
  );
};

export default Transactions;
