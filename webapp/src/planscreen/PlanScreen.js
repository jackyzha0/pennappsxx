import React, { Component } from 'react';
import wtello from './tello.png';
import btello from './blacktello.png';
import linear from './line-chart.png';
import Carousel from 'react-bootstrap/Carousel';
import { List, Segment, Button, Label } from 'semantic-ui-react'

const styles = {
  topPanel: {
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
  },

};

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
              <List.Item>
                <List.Content>

                  <div style={styles.panel}>
                    <div style={{textAlign: 'center'}}>
                    <img class="ui small image" src={wtello} /> White Tello Drone
                    </div>

                    <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginLeft: "250px", marginRight: "250px"}}>
                      <div style={{display: 'flex', flexFlow: 'column', textAlign: 'left'}}>
                        <p><p style={{fontWeight: "bold"}}>Drone ID:</p> 239847987</p>
                        <p><p style={{fontWeight: "bold"}}>Job ID:</p> 19384791</p>
                        <p><p style={{fontWeight: "bold"}}>Model:</p> EDU</p>
                        <p><p style={{fontWeight: "bold"}}>Battery:</p> 100%</p>
                      </div>
                      <div style={{display: 'flex', flexFlow: 'column'}}>
                         <p style={ isActive ? {color:'green'} : {color: 'red'}}> STATUS</p>
                         <p><p style={{fontWeight: "bold"}}>Flight Time:</p> 3 minutes</p>
                         <p><p style={{fontWeight: "bold"}}>Speed:</p> 5 km/hour</p>
                         <p><p style={{fontWeight: "bold"}}>Last Updated Date:</p> 9/7/2019</p>
                      </div>
                    </div>

                  </div>
                </List.Content>
              </List.Item>

              <List.Item>
                <List.Content>

                <div style={styles.panel}>
                  <div style={{textAlign: 'center', flexDirection: "row", alignItems: "center"}}>
                  <img class="ui middle aligned small image" src={btello} />
                  <p> Black Drone EDU #1</p>
                  </div>

                  <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginLeft: "250px", marginRight: "250px"}}>
                    <div style={{display: 'flex', flexFlow: 'column', textAlign: 'left'}}>
                      <p><p style={{fontWeight: "bold"}}>Drone ID:</p> 239847987</p>
                      <p><p style={{fontWeight: "bold"}}>Job ID:</p> 19384791</p>
                      <p><p style={{fontWeight: "bold"}}>Model:</p> EDU</p>
                      <p><p style={{fontWeight: "bold"}}>Battery:</p> 100%</p>
                    </div>
                    <div style={{display: 'flex', flexFlow: 'column'}}>
                       <p style={ isActive ? {color:'green'} : {color: 'red'}}> STATUS</p>
                       <p><p style={{fontWeight: "bold"}}>Flight Time:</p> 3 minutes</p>
                       <p><p style={{fontWeight: "bold"}}>Speed:</p> 5 km/hour</p>
                       <p><p style={{fontWeight: "bold"}}>Last Updated Date:</p> 9/7/2019</p>
                    </div>
                  </div>

                </div>

                </List.Content>
              </List.Item>

              <List.Item>
                <List.Content>
                <div style={styles.panel}>
                  <div style={{textAlign: 'center'}}>
                  <img class="ui small image" src={btello} /> Black Drone EDU #2
                  </div>
                  <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginLeft: "250px", marginRight: "250px"}}>
                    <div style={{display: 'flex', flexFlow: 'column', textAlign: 'left'}}>
                      <p><p style={{fontWeight: "bold"}}>Drone ID:</p> 239847987</p>
                      <p><p style={{fontWeight: "bold"}}>Job ID:</p> 19384791</p>
                      <p><p style={{fontWeight: "bold"}}>Model:</p> EDU</p>
                      <p><p style={{fontWeight: "bold"}}>Battery:</p> 100%</p>
                    </div>
                    <div style={{display: 'flex', flexFlow: 'column'}}>
                       <p style={ isActive ? {color:'green'} : {color: 'red'}}> STATUS</p>
                       <p><p style={{fontWeight: "bold"}}>Flight Time:</p> 3 minutes</p>
                       <p><p style={{fontWeight: "bold"}}>Speed:</p> 5 km/hour</p>
                       <p><p style={{fontWeight: "bold"}}>Last Updated Date:</p> 9/7/2019</p>
                    </div>
                  </div>
                </div>
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        </div>
        <div style={{display: "flex", justifyContent: "flex-end", marginTop: "10px", marginRight: "10px", marginBottom: "10px"}}>
        <p style={{marginTop:"12px", marginRight: "25px", color: "white"}}> Selected Flight Pattern: <em style={{color: "ADD8E6", fontWeight: "bold"}}> LINEAR </em> </p>
        <button class="medium ui green button">
          DEPLOY
        </button>
        </div>
      </div>



    )
  }
}
