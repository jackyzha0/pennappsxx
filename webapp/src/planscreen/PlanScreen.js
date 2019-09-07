import React, { Component } from 'react';

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
          <h1>carousel goes here</h1>
          <h1>use this: https://react-bootstrap.github.io/components/carousel/</h1>
        </div>

        <div style={styles.botPanel}>
          <h1>list goes here</h1>
          <h1>use something like this: https://semantic-ui.com/elements/list.html</h1>
        </div>
      </div>
    )
  }
}
