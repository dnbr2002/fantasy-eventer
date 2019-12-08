import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from 'auth';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Grid from '@material-ui/core/Grid/index';
import Button from '@material-ui/core/Button/index';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import IconButton from '@material-ui/core/IconButton/index';
import TextField from '@material-ui/core/TextField/index';
import Typography from '@material-ui/core/Typography/index';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Shared components
import { FacebookLoginButton, GoogleLoginButton, TwitterLoginButton } from "react-social-login-buttons";


// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';

// Service methods
// const signIn = () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(true);
//     }, 1500);
//   });
// };

class SignIn extends Component {
  _isMounted = false;
  state = {
    values: {
      email: '',
      password: ''
    },
    touched: {
      email: false,
      password: false
    },
    errors: {
      email: null,
      password: null
    },
    isValid: false,
    isLoading: false,
    submitError: null
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = errors ? false : true;
    if(this._isMounted)
    this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;
    if(this._isMounted)
    this.setState(newState, this.validateForm);
  };

  handleSignIn = () => {
    try {
      const { history } = this.props;
      const { values } = this.state;
      if(this._isMounted)
      this.setState({ isLoading: true });

      this.props.signInWithEmail(values.email, values.password);

      localStorage.setItem('isAuthenticated', true);

      history.push('/');
    } catch (error) {
      if(this._isMounted){
      this.setState({
        isLoading: false,
        serviceError: error
      });
    }
    }
  };

  render() {
    const { classes } = this.props;
    const {
      values,
      touched,
      errors,
      isValid,
      submitError,
      isLoading
    } = this.state;

    const showEmailError = touched.email && errors.email;
    const showPasswordError = touched.password && errors.password;

    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.quoteWrapper}
            item
            lg={5}
          >
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography
                  className={classes.quoteText}
                  variant="h1"
                >
                  Welcome to Fantasy Eventer!!
                </Typography>
                <div className={classes.person}>
                  <Typography
                    className={classes.name}
                    variant="body1"
                  >
                    Login 
                  </Typography>
                  <Typography
                    className={classes.bio}
                    variant="body2"
                  >
                    Lets play!!
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            className={classes.contentWrapper}
            item
            lg={7}
            xs={12}
          >
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  onClick={this.handleBack}
                >
                  <ArrowBackIcon />
                </IconButton>
                {/* <a
                  href="https://devias.io"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="Fantasy Eventer Logo"
                    className={classes.logoImage}
                    src="../../../common/logo/logo.jpg"
                  />
                </a> */}
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    variant="body1"
                  >
                    Sign in with social media
                  </Typography>
                  <FacebookLoginButton 
                    className={classes.facebookButton}
                    color="primary"
                    onClick={this.props.signInWithFacebook} 
                    size="small"
                    variant="contained"
                  >                    
                    Login with Facebook
                  </FacebookLoginButton>
                  <GoogleLoginButton
                    className={classes.googleButton}
                    onClick={this.props.signInWithGoogle}
                    size="large"
                    variant="contained"
                  >
                  </GoogleLoginButton>
                  <TwitterLoginButton
                    className={classes.twitterButton}
                    onClick={this.props.signInWithTwitter}
                    size="large"
                    variant="contained"
                  >
                    Login with Twitter
                  </TwitterLoginButton>
                  <Typography
                    className={classes.sugestion}
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      onChange={event =>
                        this.handleFieldChange('email', event.target.value)
                      }
                      type="text"
                      value={values.email}
                      variant="outlined"
                    />
                    {showEmailError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.email[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Password"
                      name="password"
                      onChange={event =>
                        this.handleFieldChange('password', event.target.value)
                      }
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    {showPasswordError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.password[0]}
                      </Typography>
                    )}
                  </div>
                  {submitError && (
                    <Typography
                      className={classes.submitError}
                      variant="body2"
                    >
                      {submitError}
                    </Typography>
                  )}
                  {isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  )}
                  <Typography
                    className={classes.signUp}
                    variant="body1"
                  >
                    Don't have an account?{' '}
                    <Link
                      className={classes.signUpUrl}
                      to="/signup"
                    >
                      Sign up
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  signInWithFacebook: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithTwitter: PropTypes.func.isRequired,
  signInWithEmail: PropTypes.func.isRequired,
};


//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = {
  signInWithEmail: authActions.signInWithEmail,
  signUpWithEmail: authActions.signUpWithEmail,
  signInWithFacebook: authActions.signInWithFacebook,
  signInWithGoogle: authActions.signInWithGoogle,
  signInWithTwitter: authActions.signInWithTwitter
};

export default compose(
    withStyles(styles),
    withRouter)(connect(null,mapDispatchToProps)(SignIn));