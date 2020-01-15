import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Details from './Details';
import Header from './Header';
import UsageList from './UsageList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Container>
        <Row>
          <Header />
        </Row>
        <Row>
          <Col><UsageList /></Col>
          <Col><Details /></Col>
        </Row>
      </Container>
    </div>
  )
};

export default App;