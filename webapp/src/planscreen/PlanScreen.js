import React, { Component } from 'react';
import wtello from './tello.png';
import btello from './blacktello.png';

const styles = {
  topPanel: {
    height: '20rem',
    width: '100%',
    border: '1px solid green'
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
          <img src={btello} className="Arrow-sideleft" alt="arrow" />
          <img src={wtello} className="Arrow" alt="arrow" />
          <img src={btello} className="Arrow-sideright" alt="arrow" />
        </div>

        <div style={styles.botPanel}>
          <h1>list goes here</h1>
          <h1>use something like this: https://semantic-ui.com/elements/list.html</h1>
        </div>
      </div>
    )
  }
}
