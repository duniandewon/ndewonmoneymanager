import React, { Fragment, useContext, useState } from 'react';

/** Category context */
import ndewonContext from '../../context/ndewon/ndewonContext';

/** Bootsrap Components */
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

/** Ndewon Components */
import CategoryForm from './CategoryForm';

const CategoryItem = () => {
  const [form, setForm] = useState(false);

  const handleClose = () => setForm(false);
  const handleShow = () => setForm(true);

  const { categories, deleteCategory, setCurrent, filtered } = useContext(
    ndewonContext
  );

  return (
    <Fragment>
      <Card>
        <Card.Body className='p-0'>
          <Table responsive hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {filtered
                ? filtered.map((category, i) => (
                    <tr key={category.id}>
                      <td>{i + 1}</td>
                      <td>{category.name}</td>
                      <td>
                        <Button
                          variant='danger'
                          onClick={() => {
                            deleteCategory(category.id);
                          }}
                        >
                          <i className='fas fa-trash-alt' />
                        </Button>{' '}
                        <Button
                          variant='info'
                          onClick={() => {
                            setCurrent(category);
                            handleShow();
                          }}
                        >
                          <i className='fas fa-cog' />
                        </Button>
                      </td>
                    </tr>
                  ))
                : categories.map((category, i) => (
                    <tr key={category.id}>
                      <td>{i + 1}</td>
                      <td>{category.name}</td>
                      <td>
                        <Button
                          variant='danger'
                          onClick={() => {
                            deleteCategory(category.id);
                          }}
                        >
                          <i className='fas fa-trash-alt' />
                        </Button>{' '}
                        <Button
                          variant='info'
                          onClick={() => {
                            setCurrent(category);
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
      <CategoryForm show={form} handleClose={handleClose} />
    </Fragment>
  );
};

export default CategoryItem;
