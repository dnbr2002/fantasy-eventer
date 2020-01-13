import React, { Component } from 'react'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Countries } from '../countries/countryName';

//Custom Components
import Portlet from '../../components/Portlet';
import PortletFooter from '../../components/Portlet';
import PortletLabel from '../../components/PortletLabel';
import PortletHeader from '../../components/PortletHeader';
import PortletContent from '../../components/PortletContent';

// Component styles
const styles = theme => ({
    root: {},
    field: {
      margin: theme.spacing(3)
    },
    textField: {
      width: '330px',
      maxWidth: '100%',
      marginRight: theme.spacing(3)
    },
    descriptionField: {
        width: '685px',
        maxWidth: '100%',
        marginRight: theme.spacing(3)
    },
    radioField: {
        width: '330px',
        maxWidth: '100%',
        marginRight: theme.spacing(3)
    },
    selectField: {
        width: '330px',
        maxWidth: '100%',
        marginRight: theme.spacing(3)
    },
    portletFooter: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
});



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
        this.setState({ [event.target.name]: event.target.value })
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
        const { classes } = this.props;
        return (
            <Portlet>
                <form
                    autoComplete="off"
                    noValidate
                    onSubmit={this.handleSubmit}
                >
                    <PortletHeader>

                        <PortletLabel
                            subtitle="Enter new competitors here."
                            title="Add Competitors"
                        />
                    </PortletHeader>
                    <PortletContent noPadding>
                        {/* <div className={classes.field}> */}


                            <div className={classes.field}>
                            <TextField 
                            autoFocus 
                            className={classes.textField}
                            margin="dense" 
                            label="Horse" 
                            id="horse" 
                            type="text" 
                            name="horse"
                            variant="outlined" 
                            />
                            
                            <TextField 
                            autoFocus 
                            className={classes.textField}
                            margin="dense" 
                            label="Rider" 
                            id="rider" 
                            type="text" 
                            name="rider"
                            variant="outlined" 
                            />
                            </div>
                            <div className={classes.field}>
                            <TextField 
                            autoFocus 
                            className={classes.textField}
                            margin="dense" 
                            label="Pic Url" 
                            id="pic" 
                            type="text" 
                            name="pic" 
                            variant="outlined"
                            />
                            
                            <TextField 
                            autoFocus 
                            className={classes.textField}
                            margin="dense" 
                            label="Score" 
                            id="score"
                             type="text" 
                             name="score" 
                             variant="outlined"
                             />
                            </div>
                            
                            <div className={classes.field}>
                            <TextField 
                            autoFocus 
                            className={classes.descriptionField}
                            margin="dense" 
                            multiline 
                            rows="4" 
                            label="Description" 
                            id="description" 
                            type="text" 
                            name="description" 
                            variant="outlined"
                            />
                            </div>
                            <div className={classes.field}>
                            <InputLabel>Country</InputLabel>
                                    <Select autoFocus
                                        className={classes.selectField}
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
                                <FormControl component="fieldset" required className={classes.radioField}>
                                    <FormLabel component="legend" className={classes.radioField}>Competitor Tier</FormLabel>
                                    <RadioGroup aria-label="tier" name="tier" value={this.state.value} onChange={this.handleChange} className={classes.radioField}>
                                        <FormControlLabel value="1" control={<Radio color="primary" />} label="1" className={classes.radioField} />
                                        <FormControlLabel value="2" control={<Radio color="primary" />} label="2" className={classes.radioField} />
                                    </RadioGroup>
                                </FormControl>
                                </div>

                    </PortletContent>
                    <PortletFooter className={classes.portletFooter}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            id="addCompetitorBtn"
                            size="medium"
                        >
                            <PersonAdd />
                            &nbsp; Submit Competitor
                        </Button>
                    </PortletFooter>
                </form>
            </Portlet>
        )
    }
}

AddCompetitor.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(AddCompetitor)