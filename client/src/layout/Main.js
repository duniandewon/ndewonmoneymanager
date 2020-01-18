import React from 'react';

/** bootstrap Components */
import Container from 'react-bootstrap/Container';

const Main = props => {
  return (
    <Container as='main' className='main py-5' fluid>
      {props.children}
    </Container>
  );
};

export default Main;
