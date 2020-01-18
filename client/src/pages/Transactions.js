import React, { Fragment, useState } from 'react';

/** Bootsrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

/** Ndewon Components */
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionItem from '../components/transactions/TransactionItem';
import TransactionFilter from '../components/transactions/TransactionFilter';

const Transactions = () => {
  const [form, setForm] = useState(false);

  const handleClose = () => setForm(false);
  const handleShow = () => setForm(true);

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
