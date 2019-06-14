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
import { mailFolderListItems, otherMailFolderListItems } from './headerData';

import './header.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

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

    const sideList = (
      <div className={classes.list}>
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
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


// const Header = ({authenticated, signOut}) => (


//   <header className="header">
//     <div className="g-row">
//       <div className="g-col">      
//         <h1 className="header__title">Fantasy Eventer</h1>
//         <ul className="header__actions">
//         {authenticated ? <li><a href="./" className="Button">Home /</a></li> : null} 
//         {authenticated ? <li><a href="./teampage" className="Button">/ TeamPage /</a></li> : null} 
//         {authenticated ? <li><a href="./leaguepage" className="Button">/ LeaguePage /</a></li> : null} 
//         {authenticated ? <li><a href="./adminpage" className="Button">/ AdminPage /</a></li> : null} 
//         {authenticated ? <li><a href="./taskspage" className="Button">/ TasksPage /</a></li> : null} 
//         {authenticated ? <li><a className="Button" onClick={signOut}>/ SignOut</a></li> : null} 
//           {/* {authenticated ? <li><Button onClick={signOut}>/ Sign out</Button></li> : null} */}

//           <li>
//             <a className="link link--github" href="./">
//               <FELogo />
//             </a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   </header>

// );



// Header.propTypes = {
//   authenticated: PropTypes.bool.isRequired,
//   signOut: PropTypes.func.isRequired
// };


//export default Header;
