import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import Details from '../Details';
import Header from '../Header';
import Loading from '../Loading';
import UsageList from '../UsageList';
import { AppActions } from '../../actions';
import { breakpoints, breakpointIsLessThan } from '../../utils/responsiveHelpers';
import './App.css';

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  name: state.app.name,
  size: state.app.size
});

const mapDispatchToProps = dispatch => ({
  setActiveBreakpoint: (name, size) => {
    dispatch(AppActions.setActiveBreakpoint(name, size));
  }
});

class App extends React.Component {
  constructor (props) {
    super(props);

    this.mediaQueryState = [];
  }

  componentDidMount() {
    Object.keys(breakpoints).forEach(key => {
      const query = window.matchMedia(`(max-width: ${breakpoints[key]}px)`);
      query.breakpoint = breakpoints[key];
      query.name = key;

      function breakpointChange() {
        this.dispatchActiveQuery();
      }

      query.addListener(breakpointChange.bind(this));

      this.mediaQueryState.push(query);
    });

    this.dispatchActiveQuery();
  }

  dispatchActiveQuery() {
    const { setActiveBreakpoint } = this.props;
    const activeQuery = this.mediaQueryState.reduce((prev, curr) => {
      return curr.matches ? curr: prev && prev.matches ? prev : null;
    });
    let name = activeQuery ? activeQuery.name : 'default';
    let size = activeQuery && activeQuery.breakpoint;

    setActiveBreakpoint(name, size);
  }

  render() {
    const { isLoading, size, view } = this.props;
    let main;

    if (isLoading) {
      main = <Row><Loading /></Row>;
    } else {
      if (size < breakpoints.tabletSm) {
        switch(view) {
          default:
            main = <Row><UsageList /></Row>;
            break;
        }
      } else {
        main = (
          <Row>
            <Col><UsageList /></Col>
            <Col><Details /></Col>
          </Row>
          );
      }
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
