import React, { Component } from 'react';
import wtello from './tello.png';
import btello from './blacktello.png';
import Carousel from 'react-bootstrap/Carousel';
import { List, Segment } from 'semantic-ui-react'

const styles = {
  topPanel: {
    height: '20rem',
    width: '100%',
  },
  botPanel: {
    height: 'min-content',
    width: '100%',
    border: '1px solid red'
  }
};

let abortController = new AbortController();

export default class PlanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [],
      flightPlan: 'LINE'
    };

    this.getStatus = this.getStatus.bind(this);
    this.launchDrones = this.launchDrones.bind(this);
  }

  componentDidMount() {
    // begin polling
    this.timer = setInterval(()=> this.getStatus(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  async getStatus() {
    // abortable fetch for safe polling
    abortController.abort(); // Cancel the previous request
    abortController = new AbortController();

    try {
      const URL = 'https://pennappsxx.herokuapp.com/status';
      let response = await fetch(URL, { signal: abortController.signal });
      let data = await response.json();
      console.log('data is ', data);
      this.setState({ status: data.status });
    }
    catch (ex) {
      if (ex.name === 'AbortError') {
        return; // Continuation logic has already been skipped, so return normally
      }

      throw ex;
    }
  };

  async launchDrones(flight_plan) {
    const URL = 'https://pennappsxx.herokuapp.com/command';
    const body = JSON.stringify({ flight_plan });

    let response = await fetch(URL, { method: 'POST', headers: {'Content-Type': 'application/json'}, body });
    let data = await response.json();

    console.log('JOB ID IS:', data.job_id);
  }

  render() {
    return (
      <div className="page-container">
        <div style={styles.topPanel}>
          <Carousel style={{height: "100%"}}>
            <Carousel.Item style={{height:"100%", backgroundColor:"black"}}>
              <div style={{height:"100%"}}>
              <img src={btello} className="Arrow-sideleft" alt="arrow" />
              <img src={wtello} className="Arrow" alt="arrow" />
              <img src={btello} className="Arrow-sideright" alt="arrow" />
              </div>
              <Carousel.Caption>
                <h3>Layout 1</h3>
                <p>This is layout 1.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{height:"100%"}}>
              <div style={{height:"100%", backgroundColor:"black"}}>
              <img src={btello} className="Arrow" alt="arrow" />
              <img src={wtello} className="Arrow" alt="arrow" />
              <img src={btello} className="Arrow" alt="arrow" />
              </div>
              <Carousel.Caption>
                <h3>Layout 2</h3>
                <p>This is layout 2.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

        <div style={styles.botPanel}>
          <Segment inverted>
            <List divided inverted relaxed>
              <List.Item>
                <List.Content>
                  <List.Header>Snickerdoodle</List.Header>
                  An excellent companion
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Poodle</List.Header>A poodle, its pretty basic
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Paulo</List.Header>
                  He's also a dog
                </List.Content>
                <button onClick={() => this.launchDrones(this.state.flightPlan)}>click me</button>
              </List.Item>
            </List>
          </Segment>
        </div>
      </div>
    )
  }
}
