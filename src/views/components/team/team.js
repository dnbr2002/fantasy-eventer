import React from 'react';
import PropTypes from 'prop-types';
import {
    Divider,
    Grid,
    Paper,
    Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PortletHeader from '../../components/PortletHeader';
import PortletLabel from '../../components/PortletLabel';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 200,
        width: 125,
        margin: theme.spacing(3)
    },
    image: {
        height: 125,
        width: 125,
    }
});

const Team = ({ team, classes, profileDetail }) => {
console.log("TEAM::", profileDetail);
    if (team) {
        return (
            <div>
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
               Pick your team.  When the team selection completeness reaches 100% your team will be ready for leagues leagues once selection locking commences about 1 hour before first ride on day of competition.  You can adjust your team as much as you like before this time.  Good luck!  
              </Typography>
              <br />
                <Divider className={classes.profileDivider} />
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Grid container className={classes.demo} justify="center" spacing={Number(8)}>
                            {team.map(competitor => (
                                <Grid key={competitor.key} item>
                                    <Paper className={classes.paper} >
                                        <Grid container justify="center">
                                            <img
                                                className={classes.image}
                                                src={competitor.pic}
                                                alt="competitor pic"
                                            />
                                            <br />
                                            <Grid container justify="center">
                                                <Typography variant="caption">
                                                    R: <b>{competitor.rider}</b>
                                                </Typography>
                                            </Grid>
                                            <Grid container justify="center">
                                                <Typography variant="caption">
                                                    H: <b>{competitor.horse}</b>
                                                </Typography>
                                            </Grid>
                                            <Grid container justify="center">
                                                <Typography variant="caption">
                                                    Score: <b>{competitor.score}</b>
                                                </Typography>
                                            </Grid>
                                            <Grid container justify="center">
                                                <Typography variant="caption">
                                                    Tier: <b>{competitor.tier}</b>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
    else {
        return (
            <div>
                <Grid container className={classes.root} spacing={10}>
                    <Grid item xs={12}>
                        <Grid container className={classes.demo} justify="center" spacing={Number(8)}>
                            <Typography component="h2" variant="h1">Pick your team...</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
};

Team.propTypes = {
    team: PropTypes.object.isRequired
};

export default withStyles(styles)(Team);