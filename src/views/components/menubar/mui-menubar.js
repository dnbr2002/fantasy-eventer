import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
  root: {
    width: '100%',
    display: "inline",
    position: "fixed",
    top: "0",
    height: "75px",
    fontWeight: "400",
    textAlign: 'left',
    padding: '0px 0 0 20px',
    zIndex: '1',
  },
  flex: {
    flex: 1,
    fontSize: '22px',
  },
  menuIcon: {
    fontSize: '32px'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const MuiMenuBar  = (props) => {
  const {classes, title, onSetSidebar} = props;
  return (   
    <AppBar className={classes.root}>
      <Toolbar>
        <IconButton className={classes.menuButton} onClick={() => onSetSidebar()} color="inherit" aria-label="Menu">
          <MenuIcon className={classes.menuIcon}/>
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex} >
          {title}
        </Typography>  
      </Toolbar>
    </AppBar>
  );
};
  
MuiMenuBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  onSetSidebar: PropTypes.func,
};           

export default withStyles(styles)(MuiMenuBar);