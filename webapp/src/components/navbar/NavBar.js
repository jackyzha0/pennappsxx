import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import MapIcon from '@material-ui/icons/Map';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import RecentJobs from '../recentjobs/RecentJobs';
import Logo from './logo.png';

let abortController = new AbortController();

const styles = {
  logo: {
    display: 'flex',
    height: '5rem',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid #9c9c9c',
    color: '#9c9c9c'
  },
  innerContainer: {
    backgroundColor: '#1b1c1d',
    display: 'flex',
    height: '100%',
    width: '100%',
    flexFlow: 'column',
    justifyContent: 'space-between',
    color: '#9c9c9c'
  }
};

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  drawer: {
    backgroundColor: '#1b1c1d',
    color: '#9c9c9c',
    display: 'flex',
    height: '100%',
    width: drawerWidth,
    borderRight: '1px solid #9c9c9c'
  },
  drawerPaper: {
    backgroundColor: '#1b1c1d',
    borderRight: '1px solid #9c9c9c',
    height: '100%',
    color: '#9c9c9c',
    width: drawerWidth,
    zIndex: 0,
  }
}));

const DrawerWrapper = ({children}) => {
  const classes = useStyles();
  return (
    <Drawer
      classes={{paper: classes.drawerPaper}}
      className={classes.drawer}
      children={children}
      variant="permanent"
      anchor="left"
    />
  )
};


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentJobs: []
    };

    this.getRecentJobs = this.getRecentJobs.bind(this);
  }

  componentDidMount() {
    // begin polling
    this.timer = setInterval(()=> this.getRecentJobs(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  async getRecentJobs() {
    // abortable fetch for safe polling
    abortController.abort(); // Cancel the previous request
    abortController = new AbortController();

    try {
      const URL = 'https://pennappsxx.herokuapp.com/jobs';
      let response = await fetch(URL, { signal: abortController.signal });
      let data = await response.json();
      // console.log('data is ', data.recentJobs);
      this.setState({ recentJobs: data.recentJobs });
    }
    catch (ex) {
      if (ex.name === 'AbortError') {
        return; // Continuation logic has already been skipped, so return normally
      }

      throw ex;
    }
  };

  render() {
    return (
      <DrawerWrapper>
        <div style={styles.logo}>
          <img src={Logo} width={75}/>
        </div>

        <div style={styles.innerContainer}>
          <List>
            <Link style={styles.navItem} to="/">
              <ListItem button key="Home">
                {/*<ListItemIcon><HomeIcon /></ListItemIcon>*/}
                <ListItemText primary="Home"/>
              </ListItem>
            </Link>

            <Divider />

            <Link style={styles.navItem} to="/images">
              <ListItem button key="Images">
                {/*<ListItemIcon><SearchIcon /></ListItemIcon>*/}
                <ListItemText primary="Images" />
              </ListItem>
            </Link>

            <Divider />

            <Link style={styles.navItem} to="/data">
              <ListItem button key="Report">
                {/*<ListItemIcon><MapIcon /></ListItemIcon>*/}
                <ListItemText primary="Report" />
              </ListItem>
            </Link>

            <Divider/>
          </List>

          <RecentJobs recentJobs={this.state.recentJobs}/>
        </div>
      </DrawerWrapper>
    )
  }
}

export default NavBar;
