import './App.css';
import 'typeface-roboto';
import React from 'react';
import history from './history';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import PlanScreen from './PlanScreen/PlanScreen';
import ImageScreen from './ImageScreen/ImageScreen';
import DataScreen from './DataScreen/DataScreen';

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100%'
  }
}

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
