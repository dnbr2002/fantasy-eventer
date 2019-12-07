import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ProgressBar from '../../components/progressBar/progressBar.js';

//Custom Comps
import CompetitorCard from "../competitors/competitorCard";

const styles = theme => ({
    root: {
        flexGrow: 1,
        // paddingTop: 0,
    },
    paper: {
        height: 175,
        width: 100,
        margin: theme.spacing(1)
    },
    image: {
        height: 100,
        width: 100,
    },
    paperDivider: {
        width: '100%'
    },
    progressBar: {
        position: "-webkit-sticky",
        top: 0
      },
      sticky: {
        background: 'white',
        // position: '-webkit-sticky',
        position: 'sticky',
        top: 10,
        bottom: 0,
        paddingTop: '10px',
        paddingBottom: '10px',
        zIndex: 5,
        // paddingTop: 0,
        // paddingBottom: 0,
      }
});


const Team = ({ team,  profileDetail, classes }, props) => {
    // console.log("TEAM::", props);
    if (team && team.size > 0) {
        return (
            <div>
                <Grid container className={classes.root}>
                    <Grid item xs={12}>
                        <Grid container className={classes.demo} justify="center" spacing={Number(1)}>
                            {team.map((competitor, key) => (
                                <CompetitorCard competitor={competitor} key={key} />
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <ProgressBar profiledetail={profileDetail} {...props} />
            </div>
        );
    }
    else {
        return (<div>
            <Typography
                variant="h3"
                color="textSecondary"
            >
                The Stable Area
          </Typography>
            <Typography
                variant="body1"
                color="textSecondary"
            >
                Pick your team.  When the team selection completeness reaches 100% your team will be ready for leagues once selection locking commences about 1 hour before first ride on day one of competition.  You can adjust your team as much as you like before this time.  Good luck!
          </Typography>
        </div>);
    }
};

Team.propTypes = {
    team: PropTypes.object
};

export default withStyles(styles)(Team);