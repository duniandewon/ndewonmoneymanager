import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

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
          <TransactionItem />
          <Card.Footer className='d-flex justify-content-end'>
            <Link to='/transactions' className='btn btn-link btn-lg'>
              View All <i class='fas fa-play fa-xs'></i>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
      <TransactionForm show={form} handleClose={handleClose} />
    </Fragment>
  );
};

export default LatestTransactions;
