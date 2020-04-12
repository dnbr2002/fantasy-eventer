/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List } from 'immutable';
import { getVisibleCompetitors } from '../../../selectors/adminSelector';
import AddCompetitor from '../../components/competitors/addCompetitor';
import * as adminActions from '../../../actions/adminActions';
import * as competitionActions from '../../../actions/competitionActions'
import AdminTable from '../../components/tables/adminTable';
import AddCompetition from '../../components/competition/addCompetition';
import RemoveTeams from '../../components/team/removeTeams';
import UpdateScores from '../../components/team/updateTeamScores';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import compose from 'recompose/compose';
// Material helpers
import { withStyles } from '@material-ui/core';
import {
    Grid,
    Divider
} from '@material-ui/core';

import { firebaseDb } from '../../../firebase/index';

import { ConfirmProvider } from "material-ui-confirm";


// Component styles
const styles = theme => ({
    root: {
        padding: theme.spacing(4)
    }
});


export class AdminPage extends Component {
    static propTypes = {
        loadCompetitors: PropTypes.func.isRequired,
        competitors: PropTypes.instanceOf(List).isRequired,
        updateCompetitor: PropTypes.func.isRequired,
        removeCompetitor: PropTypes.func.isRequired,

    };

    constructor() {
        super()
        this.state = {
            userCount: 0,
        };
    }

    componentWillMount() {
        this.props.loadCompetitors();
        firebaseDb.ref('users').once('value').then(snapshot => {
            const users = snapshot.numChildren();
            console.log("USERLENGTH::", users);
            this.setState({
                userCount: users
            })
        })
    }

    render() {
        console.log("ADMINPROPS::", this.props)
        const { classes, className } = this.props;
        const { userCount } = this.state
        const rootClassName = classNames(classes.root, className);
        return (
            <div className={rootClassName}>
                {/* <div className="g-row">
                <div className="g-col">                     */}
                <Typography variant="h1" color="textSecondary">Admin Center</Typography>
                <br />
                <Divider />
                <br />
                <br />
                <Typography variant="h2" color="textSecondary">Bulk User Controls</Typography>
                <br />
                <Typography variant="h3" color="textSecondary">Total Existing Users: {userCount}</Typography>
                <br />
                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        item
                        xs={6}
                    >
                        <RemoveTeams {...this.props} />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                            <ConfirmProvider>
                        <UpdateScores {...this.props} />
                        </ConfirmProvider>
                    </Grid>
                </Grid>
                <br />
                <br />
                <Typography variant="h2" color="textSecondary">Add Controls</Typography>
                <br />
                <Grid
                    container
                    spacing={3}
                >
                <Grid
                    item
                    xs={6}
                >
                    <AddCompetitor {...this.props} />
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <AddCompetition {...this.props} />
                </Grid>
                </Grid>

                <br />
                <br />
                <Typography variant="h2" color="textSecondary">Competitors Updates</Typography>
                <AdminTable {...this.props} />
                {/* </div>
            </div> */}
            </div>
        );
    }
}

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
    getVisibleCompetitors,
    (competitors) => ({
        competitors
    })
);



const mapDispatchToProps = Object.assign(
    {},
    adminActions,
    competitionActions,
);

export default compose(
    withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(withRouter(AdminPage));
