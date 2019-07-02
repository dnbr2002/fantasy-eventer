import React, { Component } from 'react'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Countries } from '../countries/countryName';

const styles = {
    card: {
        minWidth: 500,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 50,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};


class AddCompetitor extends Component {
    static propTypes = {
        createCompetitor: PropTypes.func.isRequired,
    };
    state = {
        value: '2',
        open: false,
        country: '',
    };

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    handleSelectCange = event => {
        console.log("EVENT::", event);
           this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ open: false });

        const horse = event.target.elements.horse.value
        const rider = event.target.elements.rider.value
        const tier = event.target.elements.tier.value
        const pic = event.target.elements.pic.value
        const country = event.target.elements.country.value
        const score = event.target.elements.score.value
        const description = event.target.elements.description.value
        const competitor = {
            horse: horse,
            rider: rider,
            tier: tier,
            pic: pic,
            country: country,
            score: score,
            description: description
        }

        this.props.createCompetitor(competitor)
    }

    render() {
        console.log("COMPPROPS::", this.props);
        console.log("COMPPROPS2::", { Countries });

        return (
            <div>
                <Button
                    variant="raised"
                    size="large"
                    color="primary"
                    onClick={this.handleClickOpen}
                >
                    <PersonAdd />
                    &nbsp; Add Competitor
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Competitor</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <div className="g-row">
                                <TextField autoFocus margin="dense" label="Horse" id="horse" type="text" name="horse" />
                            </div>
                            <br />
                            <div className="g-row">
                                <TextField autoFocus margin="dense" label="Rider" id="rider" type="text" name="rider" />
                            </div>
                            <br />
                            <div className="g-row">
                                <TextField autoFocus margin="dense" label="Pic Url" id="pic" type="text" name="pic" />
                            </div>
                            <br />
                            <div className="g-row">
                                <TextField autoFocus margin="dense" label="Score" id="score" type="text" name="score" />
                            </div>
                            <br />
                            <div className="g-row">
                                <TextField autoFocus margin="dense" multiline rows="4" label="Description" id="description" type="text" name="description" />
                            </div>
                            <br />
                            <div className="g-row">
                                <FormControl component="fieldset" required>
                                    <FormLabel component="legend">Competitor Tier</FormLabel>
                                    <RadioGroup aria-label="tier" name="tier" value={this.state.value} onChange={this.handleChange}>
                                        <FormControlLabel value="1" control={<Radio color="primary" />} label="1" />
                                        <FormControlLabel value="2" control={<Radio color="primary" />} label="2" />
                                    </RadioGroup>
                                </FormControl>
                                <br />
                                <br />
                                <div className="g-row">
                                    <InputLabel>Country</InputLabel>
                                    <Select autoFocus
                                        margin="dense"
                                        id="country"
                                        name="country"
                                        value={this.state.country}
                                        onChange={this.handleSelectCange}
                                    >
                                        {Countries.map((x, i) => (
                                            <MenuItem value={x.abbreviation}>{x.country}</MenuItem>
                                        ))}
                                        })
     
                                </Select>
                                </div>
                            </div>
                            <Button variant="raised" size="large" color="primary" id="addCompetitorBtn" type="submit">Submit</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

AddCompetitor.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(AddCompetitor)