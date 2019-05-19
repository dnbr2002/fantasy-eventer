import React, { Component } from 'react'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddLocation from '@material-ui/icons/AddLocation';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddCompetition extends Component {
    static propTypes = {
        createCompetitor: PropTypes.func.isRequired,
    };

    constructor() {
        super()
        this.state = {
            open: false,
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

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ open: false });
        const name = event.target.elements.name.value
        const desc = event.target.elements.desc.value
        const location = event.target.elements.location.value
        const date = event.target.elements.date.value
        const active = event.target.elements.active.value
        const pic = event.target.elements.pic.value
        const competition = {
            name: name,
            desc: desc,
            location: location,
            date: date,
            active: active,
            pic: pic
        }

        this.props.createCompetition(competition)
    }

    render() {
        return (
            <div>
                <Button
                    variant="raised"
                    size="large"
                    color="primary"
                    onClick={this.handleClickOpen}
                >
                    <AddLocation />
                    &nbsp; Add Competition
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Competition</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <div className="g-row">
                                <TextField label="Name" id="name" type="text" name="name" />
                            </div>
                            <div className="g-row">
                                <TextField multiline rows="2" label="Desc" id="desc" type="text" name="desc" />
                            </div>
                            <br />
                            <div className="g-row">
                                <TextField label="Location" id="location" type="text" name="location" />
                            </div>
                            <br />
                            <div className="g-row">
                                <TextField label="Date" id="date" type="text" name="date" />
                            </div>
                            <br />
                            <div className="g-row">
                            <TextField label="Active" id="active" type="text" name="active" />
                            </div>
                            <br />
                            <div className="g-row">
                                <TextField label="Pic-Url" id="pic" type="text" name="pic" />
                            </div>
                            <br />
                            <br />
                            <Button variant="raised" size="medium" color="primary" id="addCompetitionBtn" type="submit">Submit</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}


export default AddCompetition