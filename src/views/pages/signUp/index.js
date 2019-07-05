import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import * as signUpActions from '../../../actions/signUpActions';
import * as authActions from '../../../actions/authActions';
import * as profileActions from '../../../actions/profileActions';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';

// Material helpers
import { withStyles } from '@material-ui/core/styles/index';

// Material components
import Button from '@material-ui/core/Button/index';
import Checkbox from '@material-ui/core/Checkbox/index';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import Grid from '@material-ui/core/Grid/index';
import IconButton from '@material-ui/core/IconButton/index';
import TextField from '@material-ui/core/TextField/index';
import Typography from '@material-ui/core/Typography/index';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Shared utilities
import validators from '../../../common/validators';

// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';

validate.validators.checked = validators.checked;

class SignUp extends Component {
  _isMounted = false;
  state = {
    values: {
      name: '',
      teamName: '',
      email: '',
      password: '',
      policy: false
    },
    touched: {
      name: false,
      teamName: false,
      email: false,
      password: false,
      policy: null
    },
    errors: {
      name: null,
      teamName: null,
      email: null,
      password: null,
      policy: null
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
    if (this._isMounted)
      this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;
    if (this._isMounted)
      this.setState(newState, this.validateForm);
  };

  handleSignUp = () => {
    try {
      const { history } = this.props;
      const { values } = this.state;
      console.log("SU1::", values.email)
      if (this._isMounted)
        this.setState({ isLoading: true });

      this.props.signUpWithEmail(values.email, values.password, values.name, values.teamName)

      history.push('/signin');
    } catch (error) {
      if (this._isMounted) {
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

    const showNameError =
      touched.name && errors.name ? errors.name[0] : false;
    const showTeamNameError =
      touched.teamName && errors.teamName ? errors.teamName[0] : false;
    const showEmailError =
      touched.email && errors.email ? errors.email[0] : false;
    const showPasswordError =
      touched.password && errors.password ? errors.password[0] : false;
    const showPolicyError =
      touched.policy && errors.policy ? errors.policy[0] : false;
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
                    Create your account
                  </Typography>
                  <Typography
                    className={classes.bio}
                    variant="body2"
                  >
                    And lets play!
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
                    alt="Devias logo"
                    className={classes.logoImage}
                    src="/images/logos/devias-logo.svg"
                  />
                </a> */}
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    variant="body1"
                  >
                    Use your email to create a new account... it's free!
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Name"
                      name="name"
                      onChange={event =>
                        this.handleFieldChange('name', event.target.value)
                      }
                      value={values.name}
                      variant="outlined"
                    />
                    {showNameError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.name[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Team name"
                      name="teamName"
                      onChange={event =>
                        this.handleFieldChange('teamName', event.target.value)
                      }
                      value={values.teamName}
                      variant="outlined"
                    />
                    {showTeamNameError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.teamName[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      onChange={event =>
                        this.handleFieldChange('email', event.target.value)
                      }
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
                    <div className={classes.policy}>
                      <Checkbox
                        checked={values.policy}
                        className={classes.policyCheckbox}
                        color="primary"
                        name="policy"
                        onChange={() =>
                          this.handleFieldChange('policy', !values.policy)
                        }
                      />
                      <Typography
                        className={classes.policyText}
                        variant="body1"
                      >
                        I have read the &nbsp;
                        <Link
                          className={classes.policyUrl}
                          to="#"
                        >
                          Terms and Conditions
                        </Link>
                        .
                      </Typography>
                    </div>
                    {showPolicyError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.policy[0]}
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
                        className={classes.signUpButton}
                        color="primary"
                        disabled={!isValid}
                        onClick={this.handleSignUp}
                        size="large"
                        variant="contained"
                      >
                        Sign up now
                    </Button>
                    )}
                  <Typography
                    className={classes.signIn}
                    variant="body1"
                  >
                    Have an account?{' '}
                    <Link
                      className={classes.signInUrl}
                      to="/signin"
                    >
                      Sign In
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

SignUp.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  signUpWithEmail: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = Object.assign(
  {},
  authActions,
  profileActions
);

export default compose(
  withStyles(styles),
  withRouter)(connect(null, mapDispatchToProps)(SignUp));