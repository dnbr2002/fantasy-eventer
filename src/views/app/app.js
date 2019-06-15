import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import muiTheme from '../components/muiTheme/muiTheme';

const App = ({ authenticated, signOut }) => (
  <div>

    <Header
      authenticated={authenticated}
      signOut={signOut}
    />

    <main>
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
      
    </main>
  </div>
);

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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
