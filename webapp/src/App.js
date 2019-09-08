import 'typeface-roboto';
import React from 'react';
import history from './history';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavBar from './components/navbar/NavBar';
import PlanScreen from './planscreen/PlanScreen';
import ImageScreen from './imagescreen/ImageScreen';
import DataScreen from './datascreen/DataScreen';

const styles = {
  container: {
    display: 'flex',
    height: '100%',
    marginRight: '4rem',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    overflowY: 'scroll',
  }
};

const WebApp = ({}) => {
  return (
    <div className="App">
      <Router history={history}>
        <div style={styles.container}>
          <NavBar/>
          <Route
            render={({ location }) => (
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  component={PlanScreen}
                />
                <Route
                  exact
                  path="/images"
                  component={ImageScreen}
                />
                <Route
                  exact
                  path="/data"
                  component={DataScreen}
                />
              </Switch>
            )}
          />
        </div>
      </Router>
    </div>
  );
};

export default WebApp;
