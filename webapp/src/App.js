import React from 'react';
import pic from './debris.jpg';
import './App.css';
import SideBar from './sidebar';
import io from 'socket.io-client';
// const io = require('socket.io-client');

const PYTHON_SERVER_URL = 'https://pennappsxx-server.herokuapp.com:8000';
let socket;

export default class MarineDebris extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      connected: false,
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    socket = io(PYTHON_SERVER_URL);
    console.log('here')
    socket.on('update', (data) => {
      console.log('update')
      this.setState({ data, connected: true })
    });

    socket.on('disconnect', () => {
      console.log('disconnect')
      this.setState({ connected: false })
    });

    socket.on('reconnect', () => {
      console.log('reconnect')
      this.setState({ connected: true })
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('submit')

    socket.emit('update', {
      data: 'User Connected'
    } )

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
