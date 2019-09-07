import React from 'react';
import pic from './debris.jpg';
import './App.css';

export default class MarineDebris extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
    <div className="App">
      <header className="App-header">
        <p>
          Marine Debris Locator
        </p>
        <img src={pic} width="500" height="300" />
        <button>
          Map
        </button>
        <button>
          Process
        </button>
      </header>
    </div>
    );
  }
}
