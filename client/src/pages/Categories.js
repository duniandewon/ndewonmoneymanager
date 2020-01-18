import React, { Fragment, useState } from 'react';

/** Bootsrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/** Ndewon Components */
import CategoryItem from '../components/categories/CategoryItem';
import CategoryForm from '../components/categories/CategoryForm';
import CategoryFilter from '../components/categories/CategoryFilter';

const Categories = () => {
  const [form, setForm] = useState(false);

  const handleClose = () => setForm(false);
  const handleShow = () => setForm(true);

  return (
    <Fragment>
      <Row>
        <CategoryFilter handleShow={handleShow} />
      </Row>
      <Row>
        <Col>
          <CategoryItem
            show={form}
            handleClose={handleClose}
            handleShow={handleShow}
          />
        </Col>
      </Row>
      <CategoryForm show={form} handleClose={handleClose} />
    </Fragment>
  );
};

export default Categories;
