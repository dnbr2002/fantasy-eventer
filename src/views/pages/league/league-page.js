import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import LeagueTable from '../../components/tables/leagueTable';
import LeagueRankTable from '../../components/tables/leagueRankTable.js';
import classNames from 'classnames';
//Redux stuff

import * as leagueActions from '../../../actions/leagueActions';
import * as adminActions from '../../../actions/adminActions';
import { LeagueSelector } from '../../../selectors/leagueSelector';

// Material helpers
import { withStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';


// Component styles
const styles = theme => ({
    root: {
      padding: theme.spacing(4)
    }
  });

class LeaguePage extends Component {

  componentWillMount() {
    this.props.loadLeague();
    this.props.loadCompetitors();
}

    render() {
        console.log("LEAGUEPROPS::",this.props);
        const { classes, className } = this.props;
        
        const rootClassName = classNames(classes.root, className);
        return (
          <div className={rootClassName}>
          <div className="g-row">
                <div className="g-col">
                  <Typography variant="h2" color="textSecondary">Your Rank</Typography>
                  <br />
                  <LeagueRankTable league={this.props.league} competitors={this.props.competitors} auth={this.props.auth} />
                  </div>
                  </div>
              <br />
            <div className="g-row">
                <div className="g-col">
                <Typography variant="h2" color="textSecondary">Global League Rankings</Typography>
                <br />
                <br />
                <LeagueTable  league={this.props.league} competitors={this.props.competitors} />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  console.log("MYSTATE::", state)
  return {
      league: LeagueSelector(state.league),
      competitors: state.competitors,
      auth: state.auth
  }
}

const mapDispatchToProps = Object.assign(
  {},
  leagueActions,
  adminActions,
);

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(LeaguePage));


  