import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import Details from './Details';
import Header from './Header';
import Loading from './Loading';
import UsageList from './UsageList';
import './App.css';

const mapStateToProps = state => ({
  isLoading: state.app.isLoading
});

const App = ({ isLoading }) => {
  let main;

  if (isLoading) {
    main = <Row><Loading /></Row>;
  } else {
    main = (
    <Row>
      <Col><UsageList /></Col>
      <Col><Details /></Col>
    </Row>
    );
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Header />
        </Row>
        <Row>
          {main}
        </Row>
      </Container>
    </div>
  )
};

export default connect(mapStateToProps)(App);
