import React, { Component } from 'react';
import wtello from './tello.png';
import btello from './blacktello.png';
import background from './grey.jpg';
import Carousel from 'react-bootstrap/Carousel';

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
          <h1>List 1</h1>
          <div class="ui list">
            <div class="item">
              <i class="users icon"></i>
              <div class="content">
                Semantic UI
              </div>
            </div>
            <div class="item">
              <i class="marker icon"></i>
              <div class="content">
                New York, NY
              </div>
            </div>
            <div class="item">
              <i class="mail icon"></i>
              <div class="content">
                <a href="mailto:jack@semantic-ui.com">jack@semantic-ui.com</a>
              </div>
            </div>
            <div class="item">
              <i class="linkify icon"></i>
              <div class="content">
                <a href="http://www.semantic-ui.com">semantic-ui.com</a>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.botPanel}>
          <h1>List 2</h1>
        </div>
      </div>



    )
  }
}
