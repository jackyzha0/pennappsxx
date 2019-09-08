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

export default class PlanScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let isActive = true;
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
      </div>



    )
  }
}
