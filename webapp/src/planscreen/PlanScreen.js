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

export default class PlanScreen extends Component {
  constructor(props) {
    super(props);
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
              </List.Item>
            </List>
          </Segment>
        </div>
      </div>



    )
  }
}
