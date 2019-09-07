import React, { Component } from 'react';

const styles = {
  statusBar: {
    height: '4rem',
    width: '100%',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  imageGrid: {
    height: 'min-content',
    width: '100%',
    border: '1px solid blue'
  }
};

export default class ImageScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-container">
        <div style={styles.statusBar}>
          <p>progress details about the mission go here</p>
        </div>

        <div style={styles.imageGrid}>
          <h1>image grid goes here, look up something that looks nice with animations</h1>
        </div>
      </div>
      )
  }
}
