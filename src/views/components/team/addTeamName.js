import React, { Component } from 'react'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class AddTeam extends Component {
    static propTypes = {
        createTeamName: PropTypes.func.isRequired,
        updateTeamName: PropTypes.func.isRequired,
        teamName: PropTypes.object,
    };
    constructor() {
        super()
        this.state = {
            teamName: ''
        };
        this.clearInput = this.clearInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    clearInput() {
        this.setState({ teamName: '' })
    }

    handleChange(event) {
        this.setState({ teamName: event.target.value });
    }

    handleKeyUp(event) {
        if (event.keyCode === 27) this.clearInput();
    }

    handleSubmit(event) {
        event.preventDefault();
        const teamName = this.state.teamName.trim();
        if (teamName.length) this.props.createTeamName(teamName);
        this.clearInput()
    }

    render() {
        return (
            <div>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="g-row">
                            <Grid container justify="center">
                            <Typography variant="display2" gutterBottom>
                            Team:&nbsp;
                                <TextField
                                    className="g-col-12"
                                    label="Enter Team Name"
                                    id="teamName"
                                    type="text"
                                    name="teamName"
                                    onChange={this.handleChange}
                                    onKeyUp={this.handleKeyUp}
                                    value={this.state.teamName}

                                />
                                </Typography>
                                </Grid>
                        </div>
                        <br />
                        {/* <Button variant="raised" size="small" color="secondary" id="addCompetitorBtn" type="submit">Submit</Button> */}
                    </form>
                </div>
            </div>
        )
    }

}