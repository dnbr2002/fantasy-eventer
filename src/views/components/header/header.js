import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { TopHeaderDataItem, MailFolderListItems, OtherMailFolderListItems } from './headerData';

import './header.css';
import styles from './styles';
// const styles = {
//   root: {
//     flexGrow: 1,
//   },
//   logoWrapper: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '63px',
//     flexShrink: 0
//   },
//   logoLink: {
//     fontSize: 0
//   },
//   logoImage: {
//     cursor: 'pointer'
//   },
//   logoDivider: {
//     marginBottom: spacing(2)
//   },
//   flex: {
//     flex: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
//   list: {
//     width: 150,
//   },
//   fullList: {
//     width: 'auto',
//   },
//   TopHeaderDataItem: {
//     marginLeft: -12,
//     marginRight: 20
//   },
// };

class Header extends Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;
    console.log("THISPROPSHEADER::", this.props)
    const sideList = (
      <div className={classes.list}>
        <TopHeaderDataItem {...this.props} className={classes.TopHeaderDataItem} />
        <List>{MailFolderListItems}</List>
        <Divider />
        <List>{OtherMailFolderListItems}</List>
      </div>
    );

    return (
      <div className={classes.root}>
        {this.props.authenticated ? <Toolbar>
          <IconButton className={classes.menuButton} color="primary" aria-label="Menu">
            <MenuIcon onClick={this.toggleDrawer('left', true)} />
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                {sideList}
              </div>
            </Drawer>
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
          <div className="header__title">Fantasy Eventer</div>
          </Typography>
          {this.props.authenticated ? <Button color="primary" onClick={this.props.signOut} >Log Out</Button> : null}
        </Toolbar> : null}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);



