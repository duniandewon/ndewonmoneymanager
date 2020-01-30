import React, { Fragment, useContext, useEffect } from 'react';

/** Auth context */
import authContext from '../context/auth/authContext';

/** Ndewon Context */
import ndewonContext from '../context/ndewon/ndewonContext';

/** Bootsrap Components */
import Row from 'react-bootstrap/Row';

/** Ndewon Components */
import OverviewCard from '../components/OverviewCard';
import LatestTransactions from '../components/LatestTransactions';

const Dashboard = () => {
  const { loadUser } = useContext(authContext);

  const { getCategories, getBanks, getTransactions } = useContext(
    ndewonContext
  );

  useEffect(() => {
    loadUser();
    getCategories();
    getBanks();
    getTransactions();
  }, []);

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
