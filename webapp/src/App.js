import React from 'react';
import pic from './debris.jpg';
import './App.css';
import SideBar from './sidebar';

export default class MarineDebris extends React.Component {

  constructor(props) {
    super(props)

    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {


    event.preventDefault();
  }

  render() {
    return(
    <div className="App">
      <SideBar />
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
        <form onSubmit={this.handleSubmit}>
        <label>
          Command:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </header>
    </div>
    );
  }
}
