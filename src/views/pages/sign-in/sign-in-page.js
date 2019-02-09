/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { authActions } from 'src/auth';
import { FacebookLoginButton, GoogleLoginButton, TwitterLoginButton } from "react-social-login-buttons";
import EmailLoginButton from "../../components/icon/EmailLoginButton";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './sign-in-page.css';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class SignInPage extends Component {
  state = {
    open: false,
    value: 0,
  };

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleSubmit(event) {
    event.preventDefault();
    const email = event.target.elements.email.value
    const password = event.target.elements.password.value
    console.log("EMAILPW", email + password)
    if (this.state.value === 0) {
      this.props.signInWithEmail(email, password);
    } else {
      this.props.signUpWithEmail(email, password);
    }
  }

  render() {
    // const { value } = this.state;
    return (
      <div>

        <Grid container spacing={24} justify="center">
          <Grid container justify="center">
            <Grid item>
              <Typography variant="display4">Fantasy Eventer</Typography>
            </Grid>
          </Grid>
          <div>
            <br />
            <br />
            <br />
            <br />
          </div>
          <Grid item xs={2}>
            <Typography variant="display1" align="center">Choose Login Provider</Typography>
          {/*
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange} fullWidth>
                <Tab label="Login" />
                <Tab label="Register" />
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer> 
              <DialogTitle>Sign In</DialogTitle>
              <form onSubmit={this.handleSubmit}>
                <DialogContent>
                  <DialogContentText>
                        </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    name="email"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button color="primary" type="submit">
                    Login
                        </Button>
                </DialogActions>
              </form>
            </TabContainer>}
            {value === 1 && <TabContainer>
              <DialogTitle>Sign Up</DialogTitle>
              <form onSubmit={this.handleSubmit}>
                <DialogContent>
                  <DialogContentText>
                    Enter email address and a password.  
                        </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    name="email"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button color="primary" type="submit">
                    Register
                        </Button>
                </DialogActions>
              </form>
            </TabContainer>}
          </Dialog> */}
            <br />
            <GoogleLoginButton onClick={this.props.signInWithGoogle} />
            <br />
            <TwitterLoginButton onClick={this.props.signInWithTwitter} />
            <br />
            <FacebookLoginButton onClick={this.props.signInWithFacebook} />
            <br />
            <Typography variant="display1" align="center">OR</Typography>
            <a href="./email-sign-in">
             <EmailLoginButton />
             </a>
          </Grid>
        </Grid>
      </div>
    );
  }
};

SignInPage.propTypes = {
  signInWithEmail: PropTypes.func.isRequired,
  signUpWithEmail: PropTypes.func.isRequired,
  signInWithFacebook: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithTwitter: PropTypes.func.isRequired
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

export default withRouter(connect(null, mapDispatchToProps)(SignInPage));
