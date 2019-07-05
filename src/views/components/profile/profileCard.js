import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ProfilePic from '../../components//profile/profilePic';
import Button from "@material-ui/core/Button";

const styles = theme => ({
    card: {
        //maxWidth: 1000
    },
    media: {
        height: 0,
        // paddingTop: "56.25%" // 16:9
    }
});

class ProfileCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileName: '',
            teamName: '',
            profilePic: '',
        };
    }

    handleChange = event => {
        console.log("here", event.target.value,"----",event.target.name)
        if (event.target.name === 'profileName') {
            this.setState({ profileName: event.target.value });
        }
        if (event.target.name === 'teamName') {
            this.setState({ teamName: event.target.value });
        }
        if (event.target.name === 'profilePic') {
            this.setState({ profilePic: event.target.value });
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const profileName = event.target.elements.profileName.value
        const teamName = event.target.elements.teamName.value
        const profilePic = event.target.elements.profilePic.value
        const profileData = {
            profileName: profileName,
            teamName: teamName,
            profilePic: profilePic,
        }

        if (!this.props.profile) {
            this.props.createProfile(profileData); 
        }
        else {
            this.props.updateProfile(this.props.profile.key, profileData)
        }        
    }

    componentWillReceiveProps(nextProps) {
        // console.log("NEXTPROPS::",nextProps.profile.profileName+"---"+this.props.profile.profileName)
        if (nextProps.profile.profileName !== this.props.profileName) {
            // console.log("here::", nextProps.profile.profileName)
            this.setState({ profileName: nextProps.profile.profileName })
        }
        if (nextProps.profile.teamName !== this.props.teamName) {
            this.setState({ teamName: nextProps.profile.teamName })
        }
        if (nextProps.profile.profilePic !== this.props.profilePic) {
            this.setState({ profilePic: nextProps.profile.profilePic })
        }
    }

    render() {
        console.log('PCPROP::',this.props);
        return (
            <div>
                <Grid container justify="center">
                    <Grid item xs={8}>
                        <Card style={{ position: 'relative' }}>
                            <form onSubmit={this.handleSubmit}>
                                <CardContent>
                                    <ProfilePic
                                        style={{ flex: 1, justify: 'flex-end' }}
                                        url={this.state.profilePic}
                                        height={250}
                                        width={250} />
                                    <br />
                                    {/* <Typography variant="display1" style={{ flex: 1 }} gutterBottom>
                                            Submit/update your profile here.
                                        </Typography> */}
                                </CardContent>

                                <CardContent>
                                    <TextField autoFocus required margin="dense" label="Team Name" id="teamName" type="text" name="teamName" value={this.state.teamName} onChange={this.handleChange} fullWidth />
                                </CardContent>

                                <CardContent>
                                    <TextField autoFocus margin="dense" label="Your Name" id="profileName" type="text" name="profileName" value={this.state.profileName} onChange={this.handleChange} fullWidth />
                                </CardContent>

                                <CardContent>
                                    <TextField autoFocus
                                        margin="dense"
                                        label="Image URL"
                                        id="profilePic"
                                        type="text"
                                        name="profilePic"
                                        value={this.state.profilePic}
                                        onChange={this.handleChange}
                                        helperText="Give your team an image so people can easily recognize you in the leagues! Simply paste a url to an image in the field of you or whatever you want to represent your teams identity."
                                        fullWidth
                                    />
                                </CardContent>
                                <br />
                                <CardActions>
                                    {!this.props.profile ?
                                        <Button variant="raised" size="large" color="primary" id="addCompetitorBtn" label="Submit" type="submit" > Submit </Button>
                                        :
                                        <Button variant="raised" size="large" color="primary" id="addCompetitorBtn" label="Submit" type="submit" > Update </Button>
                                    }
                                </CardActions>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
};

export default withStyles(styles)(ProfileCard);