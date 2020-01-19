import React, { Fragment, useContext } from 'react';

/** Alert context */
import alertContext from '../context/alert/alertContext';

/** Bootstrap components */
import Alert from 'react-bootstrap/Alert';

const Alerts = () => {
  const { alerts } = useContext(alertContext);
  return (
    <Fragment>
      {alerts.length > 0 &&
        alerts.map(alert => (
          <Alert key={alert.id} variant={alert.type}>
            <h4>
              <i className='fas fa-info-circle'></i> {alert.msg}
            </h4>
          </Alert>
        ))}
    </Fragment>
  );
};

export default Alerts;
