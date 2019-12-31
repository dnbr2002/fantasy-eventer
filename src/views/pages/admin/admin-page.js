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

    componentWillMount() {
        this.props.loadCompetitors();
    }

    render() {
        console.log("ADMINPROPS::",this.props)
        const { classes, className } = this.props;
        const rootClassName = classNames(classes.root, className);
        return (
            <div className={rootClassName}>
            <div className="g-row">
                <div className="g-col">                    
                <Typography variant="h2" color="textSecondary">Admin Center </Typography>
                    <br />
                    <RemoveTeams {...this.props} />
                    <br />
                    <UpdateScores {...this.props} />
                    <br />
                    <AddCompetitor {...this.props} />
                    <br />
                    <AddCompetition {...this.props} />
                    <br />
                    <AdminTable {...this.props} />
                </div>
            </div>
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
    withStyles(styles),connect(mapStateToProps, mapDispatchToProps))(withRouter(AdminPage));
