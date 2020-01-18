import React, { Fragment, useContext, useState } from 'react';

/** Bank context */
import ndewonContext from '../../context/ndewon/ndewonContext';

/** Bootsrap Components */
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

/** Ndewon Components */
import BankForm from './BankForm';

const BankItem = () => {
  const [form, setForm] = useState(false);

  const handleClose = () => setForm(false);
  const handleShow = () => setForm(true);

  const { banks, deleteBank, setCurrent, filtered } = useContext(ndewonContext);

  return (
    <Fragment>
      <Card>
        <Card.Body className='p-0'>
          <Table responsive hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Account Number</th>
                <th>Account Holder</th>
                <th>Balance</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {filtered
                ? filtered.map((bank, i) => (
                    <tr key={bank.id}>
                      <td>{i + 1}</td>
                      <td>{bank.name}</td>
                      <td>{bank.accountNumber}</td>
                      <td>{bank.accountHolder}</td>
                      <td>{bank.balance}</td>
                      <td>
                        <Button
                          variant='danger'
                          onClick={() => {
                            deleteBank(bank.id);
                          }}
                        >
                          <i className='fas fa-trash-alt' />
                        </Button>{' '}
                        <Button
                          variant='info'
                          onClick={() => {
                            setCurrent(bank);
                            handleShow();
                          }}
                        >
                          <i className='fas fa-cog' />
                        </Button>
                      </td>
                    </tr>
                  ))
                : banks.map((bank, i) => (
                    <tr key={bank.id}>
                      <td>{i + 1}</td>
                      <td>{bank.name}</td>
                      <td>{bank.accountNumber}</td>
                      <td>{bank.accountHolder}</td>
                      <td>${bank.balance}</td>
                      <td>
                        <Button
                          variant='danger'
                          onClick={() => {
                            deleteBank(bank.id);
                          }}
                        >
                          <i className='fas fa-trash-alt' />
                        </Button>{' '}
                        <Button
                          variant='info'
                          onClick={() => {
                            setCurrent(bank);
                            handleShow();
                          }}
                        >
                          <i className='fas fa-cog' />
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <BankForm show={form} handleClose={handleClose} />
    </Fragment>
  );
};

export default BankItem;
