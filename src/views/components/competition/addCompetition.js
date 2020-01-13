import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    TextField,
    Button,
    withStyles
} from '@material-ui/core';
import AddLocation from '@material-ui/icons/AddLocation';
import {
    MuiPickersUtilsProvider,
    DatePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import toastr from 'toastr';
//Custom Components
import Portlet from '../../components/Portlet';
import PortletFooter from '../../components/Portlet';
import PortletLabel from '../../components/PortletLabel';
import PortletHeader from '../../components/PortletHeader';
import PortletContent from '../../components/PortletContent';

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
    portletFooter: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
});

class AddCompetition extends Component {
    static propTypes = {
        createCompetitor: PropTypes.func.isRequired,
    };

    constructor() {
        super()
        this.state = {
            open: false,
            selectedDate: null
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleClearForm = () => { 
        document.getElementById("addCompetition-form").reset();
      }


    handleDateChange = (date) => {
        console.log('NEWDATE::', date);
        this.setState({ selectedDate: date })
    };

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ open: false });
        const name = event.target.elements.name.value
        const url = event.target.elements.url.value
        const desc = event.target.elements.desc.value
        const location = event.target.elements.location.value
        const date = event.target.elements.date.value
        const active = event.target.elements.active.value
        const pic = event.target.elements.pic.value
        const competition = {
            name: name,
            url: url,
            desc: desc,
            location: location,
            date: date,
            active: active,
            pic: pic
        }

        this.props.createCompetition(competition)
        toastr.success("Competition '" + name + "' added!");
        this.handleClearForm();
    }

    render() {
        const { classes } = this.props;
        const { selectedDate } = this.state
        return (
            <Portlet>
                <form
                    autoComplete="off"
                    noValidate
                    onSubmit={this.handleSubmit}
                    id="addCompetition-form"
                >
                    <PortletHeader>

                        <PortletLabel
                            subtitle="Enter new competitoons here."
                            title="Add Competition"
                        />
                    </PortletHeader>
                    <PortletContent noPadding>


                        <div className={classes.field}>
                            <TextField
                                autoFocus
                                className={classes.textField}
                                margin="dense"
                                label="Name"
                                id="name"
                                type="text"
                                name="name"
                                variant="outlined"
                            />

                            <TextField
                                autoFocus
                                className={classes.textField}
                                margin="dense"
                                label="Url"
                                id="url"
                                type="text"
                                name="url"
                                variant="outlined"
                            />
                        </div>


                        <div className={classes.field}>
                            <TextField
                                autoFocus
                                className={classes.textField}
                                margin="dense"
                                label="Location"
                                id="location"
                                type="text"
                                name="location"
                                variant="outlined"
                            />

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    autoFocus
                                    variant="inline"
                                    inputVariant="outlined"
                                    id="date"
                                    label="Date"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    InputAdornmentProps={{ position: "start" }}
                                    onChange={date => this.handleDateChange(date)}
                                />
                            </MuiPickersUtilsProvider>
                        </div>

                        <div className={classes.field}>

                            <TextField
                                autoFocus
                                className={classes.textField}
                                margin="dense"
                                label="Active"
                                id="active"
                                type="text"
                                name="active"
                                variant="outlined"

                            />

                            <TextField
                                autoFocus
                                className={classes.textField}
                                margin="dense"
                                label="Pic-Url"
                                id="pic"
                                type="text"
                                name="pic"
                                variant="outlined"
                            />
                        </div>

                        <div className={classes.field}>
                            <TextField
                                autoFocus
                                className={classes.descriptionField}
                                margin="dense"
                                multiline rows="4"
                                label="Desc"
                                id="desc"
                                type="text"
                                name="desc"
                                variant="outlined"
                            />
                        </div>

                        <br />
                        <br />
                        <br />

                    </PortletContent>
                    <PortletFooter className={classes.portletFooter}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            id="addCompetitionBtn"
                            size="medium"
                        >
                            <AddLocation />
                            &nbsp; Add Competition
                        </Button>
                    </PortletFooter>
                </form>
            </Portlet>
        )
    }
}


export default withStyles(styles)(AddCompetition);