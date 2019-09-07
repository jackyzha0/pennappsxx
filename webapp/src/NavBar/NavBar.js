import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/core/SvgIcon/SvgIcon';
import SearchIcon from '@material-ui/icons/Search';
import MapIcon from '@material-ui/icons/Map';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';

const styles = {
  navItem: {}
};

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link style={styles.navItem} to="/">
          <ListItem button key="Home">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>

        <Divider />

        <Link style={styles.navItem} to="/images">
          <ListItem button key="Images">
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText primary="Images" />
          </ListItem>
        </Link>

        <Divider />

        <Link style={styles.navItem} to="/data">
          <ListItem button key="Map">
            <ListItemIcon><MapIcon /></ListItemIcon>
            <ListItemText primary="Map" />
          </ListItem>
        </Link>

        <Divider />
      </List>
    </Drawer>
  )
}

export default NavBar;
