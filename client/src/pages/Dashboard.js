import React, { Fragment } from 'react';

/** Bootsrap Components */
import Row from 'react-bootstrap/Row';

/** Ndewon Components */
import OverviewCard from '../components/OverviewCard';
import LatestTransactions from '../components/LatestTransactions';

const Dashboard = () => {
  return (
    <Fragment>
      <Row>
        <OverviewCard
          title='total icome'
          value='24,000'
          icon='fas fa-dollar-sign'
          color='success'
        />
        <OverviewCard
          title='total spendings'
          value='10,000'
          icon='fas fa-dollar-sign'
          color='danger'
        />
        <OverviewCard
          title='total savings'
          value='100,000'
          icon='fas fa-piggy-bank'
          color='info'
        />
        <OverviewCard
          title='total balance'
          value='1000,000'
          icon='fas fa-coins'
          color='warning'
        />
      </Row>
      <Row className='my-5'>
        <LatestTransactions />
      </Row>
    </Fragment>
  );
};

export default Dashboard;
