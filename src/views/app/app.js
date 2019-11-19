import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose';
import { authActions, getAuth } from 'src/auth';
import Header from '../components/header';
import RequireAuthRoute from '../components/require-auth-route';
import RequireAdminRoute from '../components/require-admin-route';
import RequireUnauthRoute from '../components/require-unauth-route';
import AdminPage from '../pages/admin';
import TasksPage from '../pages/tasks';
import HomePage from '../pages/home';
import TeamPage from '../pages/team';
import LeaguePage from '../pages/league';
import ProfilePage from '../pages/profile';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import Contact from '../pages/contact';
import Rules from '../pages/rules';
import Newsfeed from '../pages/newsfeed';
import Schedule from '../pages/schedule';
// Component styles
import styles from './styles';
import classNames from 'classnames';
import { withStyles, withWidth } from '@material-ui/core';
// Material components
import { Drawer } from '@material-ui/core';
//Custom components
import { Topbar, Sidebar, Footer } from '../../layout';
import { classPrivateProperty } from '@babel/types';

//Firebase
import { firebaseDb } from '../../firebase';


class App extends Component {
  constructor(props) {
    super(props);

    const isMobile = ['xs', 'sm', 'md'].includes(props.width);

    this.state = {
      isOpen: !isMobile,
      role: "user",
    };
  }

componentDidMount() {
  if(this.props.authenticated === false) {
    this.setState({isOpen: false});
  }
}

componentWillMount() {
  if(this.props.authenticated === false) {
    this.setState({isOpen: false});
  }
  if(this.props.id){
    this.getRole(this.props.id)
  } 

}

getRole = (id) => {
  firebaseDb.ref(`users`).child(`${id}`).child(`${id}`).on('value', snapshot => {
      console.log("ADMINAUTH::", snapshot.val());
      if (snapshot.exists()) {
          console.log("ADMINAUTH::2", snapshot.val().role);
          this.setState({ role: snapshot.val().role })
      }
  }
  )
}

componentWillReceiveProps(nextProps) {
  console.log("NEXTPROPS::", nextProps)
  if(nextProps.authenticated === false) {
    this.setState({isOpen: false});
  }
}

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleToggleOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { classes, authenticated, signOut, id, width, location } = this.props;
    const { isOpen } = this.state;

    const isMobile = ['xs', 'sm', 'md'].includes(width);
    const shiftTopbar = isOpen && !isMobile;
    const shiftContent = isOpen && !isMobile;
    console.log("APPPROPS::",this.props)
    return (
      <div>
        {authenticated ? 
        <Topbar
          className={classNames(classes.topbar, {
            [classes.topbarShift]: shiftTopbar
          })}
          isSidebarOpen={isOpen}
          onToggleSidebar={this.handleToggleOpen}
          signOut={signOut}
          authenticated={authenticated}
          title="Fantasy Eventer"
        /> : null}

        <Drawer
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
          onClose={this.handleClose}
          open={isOpen}
          variant={isMobile ? 'temporary' : 'persistent'}
        >
          <Sidebar
            className={classes.sidebar}
            authenticated={authenticated}            
            id={id}
          />
        </Drawer>
        {/* <Header
          authenticated={authenticated}
          signOut={signOut}
          id={id}
        /> */}

        <main className={classNames(classes.content, {
          [classes.contentShift]: shiftContent
        })}>
          <RequireAuthRoute authenticated={authenticated} exact path="/" component={HomePage} />
          <RequireAuthRoute authenticated={authenticated} exact path="/contactpage" component={Contact} />
          <RequireAuthRoute authenticated={authenticated} exact path="/rulespage" component={Rules} />
          <RequireAuthRoute authenticated={authenticated} exact path="/newsfeedpage" component={Newsfeed} />
          <RequireAuthRoute authenticated={authenticated} exact path="/schedulepage" component={Schedule} />
          <RequireAuthRoute authenticated={authenticated} exact path="/teampage" component={TeamPage} />
          <RequireAuthRoute authenticated={authenticated} exact path="/leaguepage" component={LeaguePage} />
          <RequireAdminRoute authenticated={authenticated} role={this.state.role} exact path="/adminpage" component={AdminPage} />
          <RequireAuthRoute authenticated={authenticated} exact path="/taskspage" component={TasksPage} />
          <RequireAuthRoute authenticated={authenticated} exact path="/profile" component={ProfilePage} />
          <RequireUnauthRoute authenticated={authenticated} path="/signin" component={SignIn} />
          <RequireUnauthRoute authenticated={authenticated} path="/signup" component={SignUp} />
          <Footer authenticated={authenticated} />
        </main>
      </div>

    )
  }
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = getAuth;

const mapDispatchToProps = {
  signOut: authActions.signOut
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)));
