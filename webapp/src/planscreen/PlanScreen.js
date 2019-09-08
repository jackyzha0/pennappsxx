import React, { Component } from 'react';
import wtello from './tello.png';
import btello from './blacktello.png';
import linear from './line-chart.png';
import Carousel from 'react-bootstrap/Carousel';
import { List, Segment, Button, Label } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

const styles = {
  topPanel: {
    flex: 'none',
    height: '30rem',
    width: '100%',
  },
  botPanel: {
    textAlign: 'left',
    height: 'min-content',
    width: '100%',
  },
  panel: {
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    flexFlow: "row",
  }
};

const MOCK_DRONES = [
  {
    model: 'Tello',
    drone_id: '19233353392',
    active: true,
    battery: '0.93',
    last_updated_date: '2019-09-08 07:19:58'
  },
  {
    model: 'Tello EDU',
    drone_id: '445348232373',
    active: true,
    battery: '0.74',
    last_updated_date: '2019-09-08 07:21:26'
  },
  {
    model: 'Tello EDU',
    drone_id: '32219458839',
    active: true,
    battery: '0.89',
    last_updated_date: '2019-09-08 07:30:00'
  },

];

let abortController = new AbortController();

export default class PlanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: []
    };

    this.getStatus = this.getStatus.bind(this);
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
      console.log('status is ', data);
      this.setState({ status: data.status });
    }
    catch (ex) {
      if (ex.name === 'AbortError') {
        return; // Continuation logic has already been skipped, so return normally
      }

      throw ex;
    }
  };


  render() {
    let isActive = true;
    return (
      <div className="page-container">
        <div style={styles.topPanel}>
          <Carousel interval="10000" style={{height: "100%"}}>
            <Carousel.Item style={{height:"100%", backgroundColor:"#ADD8E6"}}>
              <div style={{height:"100%"}}>
              <img src={btello} className="Arrow-sideleft" alt="arrow" />
              <img src={wtello} className="Arrow" alt="arrow" />
              <img src={btello} className="Arrow-sideright" alt="arrow" />
              </div>
              <Carousel.Caption>
                <h3>FAN OUT</h3>
                <p>Our drones will move together in a cone formation outwards.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{height:"100%"}}>
              <div style={{height:"100%", backgroundColor:"black"}}>
              <img src={btello} className="Arrow" alt="arrow" />
              <img src={wtello} className="Arrow" alt="arrow" />
              <img src={btello} className="Arrow" alt="arrow" />
              </div>
              <Carousel.Caption>
                <h3>LINEAR</h3>
                <p>Our drones will move together in a linear direction forwards.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

        <div style={styles.botPanel}>
          <Segment inverted>
            <List divided inverted relaxed>
              {!!this.state.status && this.state.status.map((drone, id) => (
                <List.Item key={id}>
                  <List.Content>
                    <div style={styles.panel}>

                      <div style={{textAlign: 'center'}}>
                        <img className="ui small image" src={(drone.model === 'Tello') ? wtello : btello} width={100} />
                        {drone.model}
                      </div>

                      <div style={{width: "100%", display: "flex", marginLeft:'2rem', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', flexFlow: 'column', textAlign: 'left'}}>
                          <p><span style={{fontWeight: "bold"}}>Drone ID: </span>{drone.drone_id}</p>
                          <p><span style={{fontWeight: "bold"}}>Model: </span>{drone.model}</p>
                          <p><span style={{fontWeight: "bold"}}>Battery: </span>{drone.battery}</p>
                        </div>

                        <div style={{display: 'flex', flexFlow: 'column', textAlign: 'right'}}>
                          <p style={ drone.active ? {color:'lightgreen'} : {color: 'red'}}>STATUS: {drone.active ? "online" : "offline"}</p>
                          <p><span style={{fontWeight: "bold"}}>Last Updated Date:</span>{drone.last_updated_date}</p>
                        </div>
                      </div>

                    </div>
                  </List.Content>
                </List.Item>
              ))}
              {MOCK_DRONES.map((drone, id) => (
                <List.Item key={id}>
                  <List.Content>
                    <div style={styles.panel}>
                      <div style={{textAlign: 'center'}}>
                        <img className="ui small image" src={(drone.model === 'Tello') ? wtello : btello} width={100} />
                        {drone.model}
                      </div>
                      <div style={{width: "100%", display: "flex", marginLeft:'2rem',  justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', flexFlow: 'column', textAlign: 'left'}}>
                          <p><span style={{fontWeight: "bold"}}>Drone ID: </span> {drone.drone_id}</p>
                          <p><span style={{fontWeight: "bold"}}>Model: </span>{drone.model}</p>
                          <p><span style={{fontWeight: "bold"}}>Battery: </span>{drone.battery}</p>
                        </div>
                        <div style={{display: 'flex', flexFlow: 'column', textAlign: 'right'}}>
                          <p style={ drone.active ? {color:'lightgreen'} : {color: 'red'}}>STATUS: {drone.active ? "online" : "offline"}</p>
                          <p><span style={{fontWeight: "bold"}}>Last Updated Date:</span>{drone.last_updated_date}</p>
                        </div>
                      </div>
                    </div>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>
        </div>
        <div style={{display: "flex", justifyContent: "flex-end", marginTop: "10px", marginRight: "10px", marginBottom: "10px"}}>
        <p style={{marginTop:"12px", marginRight: "25px", color: "white"}}> Selected Flight Pattern: <em style={{color: "ADD8E6", fontWeight: "bold"}}> LINEAR </em> </p>
          <Link style={styles.navItem} to="/images">
            <button className="medium ui green button" onClick={() => this.launchDrones(this.state.flightPlan)}>
              DEPLOY
            </button>
          </Link>
        </div>
      </div>



    )
  }
}
