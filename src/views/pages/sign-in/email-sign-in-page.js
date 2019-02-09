/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import * as signUpActions from '../../../actions/signUpActions';
import * as authActions from '../../../actions/authActions';
// import { authActions } from 'src/auth';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import './sign-in-page.css';

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

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

class EmailSignInPage extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            value: 0,
        };
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
        console.log('SIGNUPPAGE::', this.props)
        // const { classes } = this.props;
        const { value } = this.state;
        return (
            <div>
                <Grid container spacing={24} justify="center">
                    <Grid container justify="center">
                        <Grid item>
                            <Typography variant="display4">Fantasy Eventer</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <br />
                        <br />
                        <br />

                        <Card>
                            <AppBar position="static">
                                <Tabs value={value} onChange={this.handleChange} fullWidth>
                                    <Tab label="Login" />
                                    <Tab label="Register" />
                                </Tabs>
                            </AppBar>
                            {value === 0 && <TabContainer>
                                <form onSubmit={this.handleSubmit}>
                                    <TextField
                                        label="Username"
                                        floatinglabeltext="Username"
                                        name="email"
                                    />
                                    <br />
                                    <TextField
                                        type="password"
                                        label="Password"
                                        floatinglabeltext="Password"
                                        name="password"
                                    />
                                    {/* <PasswordField
                                hintText="At least 8 characters"
                                floatingLabelText="Enter your password"
                                errorText="Your password is too short"
                                name="password"
                            /> */}
                                    <br />
                                    <br />
                                    <Button variant="raised" size="large" color="primary" type="submit">Submit</Button>
                                </form>
                            </TabContainer>}
                            {value === 1 && <TabContainer>
                                <form onSubmit={this.handleSubmit}>
                                    <TextField
                                        label="Enter Email"
                                        floatinglabeltext="Username"
                                        name="email"
                                    />
                                    <br />
                                    <TextField
                                        type="password"
                                        label="Enter Password"
                                        name="password"
                                    />
                                    {/* <PasswordField
                                hintText="At least 8 characters"
                                floatingLabelText="Enter your password"
                                errorText="Your password is too short"
                                name="password"
                            /> */}
                                    <br />
                                    <br />
                                    <Button variant="raised" size="large" color="primary" type="submit">Submit</Button>
                                </form>
                            </TabContainer>}
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
};

EmailSignInPage.propTypes = {
    signUpWithEmail: PropTypes.func.isRequired,
    signInWithEmail: PropTypes.func.isRequired
};


const mapDispatchToProps = Object.assign(
    {},
    signUpActions,
    authActions
);

export default withStyles(styles)(connect(null, mapDispatchToProps)(EmailSignInPage));
