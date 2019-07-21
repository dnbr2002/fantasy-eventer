import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import LeagueTable from '../../components/tables/leagueTable';
import RankTable from '../../components/tables/ranktTable.js';
import classNames from 'classnames';
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
                  <RankTable />
                  </div>
                  </div>
              <br />
            <div className="g-row">
                <div className="g-col">
                <Typography variant="h2" color="textSecondary">Global League Rankings</Typography>
                <br />
                <br />
                <LeagueTable />
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
export default withStyles(styles)(LeaguePage);


  