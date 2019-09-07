import React from 'react';
const io = require('socket.io-client');
import pic from './debris.jpg';
import './App.css';
import SideBar from './sidebar';

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

    socket.on('update', (data) => {
      this.setState({ data, connected: true })
    });

    socket.on('disconnect', () => {
      this.setState({ connected: false })
    });

    socket.on('reconnect', () => {
      this.setState({ connected: true })
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    socket.emit('my event', {
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
