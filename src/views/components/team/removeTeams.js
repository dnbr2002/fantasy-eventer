import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { firebaseDb } from '../../../firebase/index';
//Material UI
import Button from '@material-ui/core/Button';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import {
    Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

//Custom Components
import Portlet from '../../components/Portlet';
import PortletHeader from '../../components/PortletHeader';
import PortletContent from '../../components/PortletContent';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 3
        // paddingTop: 0,
    },
    content: {
        display: 'flex',
        alignItems: 'center'
    },
});


class RemoveTeam extends Component {
    static propTypes = {
        bulkRemoveTeams: PropTypes.func.isRequired,
        countUsersWithTeams: PropTypes.func.isRequired
    };

    constructor() {
        super()
        this.state = {
            counter: 0
        };
        this.handleRemove = this.handleRemove.bind(this)
    }

    handleRemove() {
        var hrcounter = 0;
        firebaseDb.ref('users').once('value').then(snapshot => {
            const users = snapshot.val();
            for (var user_id in users) {
                hrcounter++
                this.setState({
                    counter: hrcounter
                })
                console.log("count::", hrcounter)
                var profilerec = firebaseDb.ref(`users/${user_id}/${user_id}`)
                profilerec.child('teamKeysTier1').set('PH');
                profilerec.child('teamKeysTier2').set('PH');
            }
        })
    }

    render() {
        console.log("REMOVETEAMS::", this.props);
        console.log("REMOVETEAMS::2", this.state);
        const { counter } = this.state
        return (
            // <div className="form">
            <Portlet>
                <PortletHeader>
                <Typography variant="h3">Clear Team Rosters</Typography>
                </PortletHeader>
                <PortletContent>
                    <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        id="removeCompetitorBtn"
                        onClick={this.handleRemove}>
                        <PeopleOutline />
                        &nbsp; Clear Teams
                        </Button>
                    <br />
                    <br />
                    <Typography variant="h4" color="textSecondary">Cleared  Teams Counter: {counter}</Typography>
                </PortletContent>
            </Portlet>
            //</div>
        )
    }
}

export default withStyles(styles)(RemoveTeam);
