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
import CategoryItem from '../components/categories/CategoryItem';
import CategoryForm from '../components/categories/CategoryForm';
import CategoryFilter from '../components/categories/CategoryFilter';

const Categories = () => {
  const { loadUser } = useContext(authContext);

  const { loading, categories, getCategories } = useContext(ndewonContext);

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
        <CategoryFilter handleShow={handleShow} />
      </Row>
      <Row>
        {categories !== null && !loading ? (
          <Col>
            <CategoryItem
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
      <CategoryForm show={form} handleClose={handleClose} />
    </Fragment>
  );
};

export default Categories;
