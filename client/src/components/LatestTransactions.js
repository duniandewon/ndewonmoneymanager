import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import ndewonContext from '../context/ndewon/ndewonContext';

/** Bootsrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

/** Ndewon Components */
import TransactionItem from './transactions/TransactionItem';
import TransactionForm from './transactions/TransactionForm';

const LatestTransactions = () => {
  const [form, setForm] = useState(false);

  const handleClose = () => setForm(false);
  const handleShow = () => setForm(true);

  const { transactions, loading } = useContext(ndewonContext);

  return (
    <Fragment>
      <Col>
        <Card>
          <Card.Header className='bg-transparent'>
            <Row className='align-items-center'>
              <Col>
                <h3>Lates Transactions</h3>
              </Col>
              <Col xs='auto'>
                <Button
                  variant='outline-primary'
                  size='lg'
                  onClick={handleShow}
                >
                  New Transaction
                </Button>
              </Col>
            </Row>
          </Card.Header>
          {transactions !== null && transactions.length > 0 && !loading ? (
            <TransactionItem />
          ) : (
            <p className='lead text-center'>
              No transactions available. Please create new transactions
            </p>
          )}
          <Card.Footer className='d-flex justify-content-end'>
            <Link to='/transactions' className='btn btn-link btn-lg'>
              View All <i className='fas fa-play fa-xs'></i>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
      <TransactionForm show={form} handleClose={handleClose} />
    </Fragment>
  );
};

export default LatestTransactions;
