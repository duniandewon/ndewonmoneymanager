import React, { Fragment } from 'react';

/** Bootsrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const OverviewCard = ({ title, value, icon, color }) => {
  return (
    <Fragment>
      <Col md={6} xl>
        <Card className='mb-4'>
          <Card.Body>
            <Row className='align-items-center'>
              <Col>
                <h6 className='card-title text-uppercase text-muted mb-2'>
                  {title}
                </h6>
                <span className='h2 mb-0'>${value}</span>
              </Col>
              <Col xs='auto'>
                <i className={`${icon} text-${color} h2 mb-0`}></i>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Fragment>
  );
};

export default OverviewCard;
