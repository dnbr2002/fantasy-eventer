import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
});

class TeamName extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            editing: false,
            open: false,
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.stopEditing = this.stopEditing.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.save = this.save.bind(this);
    }

    handleClickOpen = () => {
        this.setState({ open: true });
        this.setState({ editing: true });
    };


    stopEditing() {
        this.setState({ editing: false });
    }


    handleClose = () => {
        this.setState({ open: false });
    };


    save(event) {
        if (this.state.editing) {
            const teamName = event.target.elements.name.value;

            if (teamName.length && teamName !== this.props.teamName.teamName) {
                this.props.updateTeamName(this.props.teamName, { teamName });
            }
            this.stopEditing();
        }
    }

    render() {
        return (
            <div>
                <br />
                <Tooltip
                    title="Click to Update Team Name"
                    placement="top"
                >
                    <Button
                        variant="flat"
                        size="large"
                        color="primary"
                        onClick={this.handleClickOpen}
                    >
                        Team-{this.props.teamName.teamName}

                    </Button>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Update Team Name</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.save}>
                            <div className="g-row">
                                <TextField label="Team Name" id="name" type="text" name="name" />
                            </div>
                            <br />
                            <Button variant="raised" size="medium" color="primary" id="updateTeamNameBtn" type="submit">Submit</Button>
                        </form>
                    </DialogContent>
                </Dialog>
                <br />
            </div>
        )
    }
}


export default withStyles(styles)(TeamName);



