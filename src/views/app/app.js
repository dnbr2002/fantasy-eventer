import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import { authActions, getAuth } from 'src/auth';
import Header from '../components/header';
import RequireAuthRoute from '../components/require-auth-route';
import RequireUnauthRoute from '../components/require-unauth-route';
import SignInPage from '../pages/sign-in';
import EmailSignInPage from '../pages/sign-in/email-sign-in-page'
import AdminPage from '../pages/admin';
import TasksPage from '../pages/tasks';
import HomePage from '../pages/home';
import TeamPage from '../pages/team';
import LeaguePage from '../pages/league';
import ProfilePage from '../pages/profile';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
// Component styles
import styles from './styles';
import classNames from 'classnames';
import { withStyles, withWidth } from '@material-ui/core';
// Material components
import { Drawer } from '@material-ui/core';
//Custom components
import { Topbar, Sidebar, Footer } from '../../layout';

class App extends Component {
  constructor(props) {
    super(props);

    const isMobile = ['xs', 'sm', 'md'].includes(props.width);

    this.state = {
      isOpen: false
    };
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
        <Topbar
          className={classNames(classes.topbar, {
            [classes.topbarShift]: shiftTopbar
          })}
          isSidebarOpen={isOpen}
          onToggleSidebar={this.handleToggleOpen}
          signOut={signOut}
          authenticated={authenticated}
          title="Fantasy Eventer"
        />

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
          <RequireAuthRoute authenticated={authenticated} exact path="/teampage" component={TeamPage} />
          <RequireAuthRoute authenticated={authenticated} exact path="/leaguepage" component={LeaguePage} />
          <RequireAuthRoute authenticated={authenticated} exact path="/adminpage" component={AdminPage} />
          <RequireAuthRoute authenticated={authenticated} exact path="/taskspage" component={TasksPage} />
          <RequireAuthRoute authenticated={authenticated} exact path="/profile" component={ProfilePage} />
          <RequireUnauthRoute authenticated={authenticated} path="/signin" component={SignIn} />
          <RequireUnauthRoute authenticated={authenticated} path="/signup" component={SignUp} />
          <RequireUnauthRoute authenticated={authenticated} path="/sign-in" component={SignInPage} />
          <RequireUnauthRoute authenticated={authenticated} path="/email-sign-in" component={EmailSignInPage} />
          <Footer />
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

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(App));
