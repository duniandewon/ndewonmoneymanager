import React, { Fragment, useState } from 'react';

/** Bootsrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/** Ndewon Components */
import BankForm from '../components/banks/BankForm';
import BankItem from '../components/banks/BankItem';
import BankFilter from '../components/banks/BankFilter';

const Banks = () => {
  const [form, setForm] = useState(false);

  const handleClose = () => setForm(false);
  const handleShow = () => setForm(true);

  return (
    <Fragment>
      <Row>
        <BankFilter handleShow={handleShow} />
      </Row>
      <Row>
        <Col>
          <BankItem
            show={form}
            handleClose={handleClose}
            handleShow={handleShow}
          />
        </Col>
      </Row>
      <BankForm show={form} handleClose={handleClose} />
    </Fragment>
  );
};

export default Banks;
