import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CustomAvatar from '../../components/avatars/avatars';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 150,
        width: 100,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

const Team = ({ team, classes }) => {
    return (
        <div>
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container className={classes.demo} justify="center" spacing={Number(8)}>
                        {team.map(competitor => (
                            <Grid key={competitor.key} item>
                                <Paper className={classes.paper} >
                                    <Grid container justify="center">
                                        <CustomAvatar
                                            src={competitor.pic}
                                            alt="competitor pic"
                                            bigAvatar="BigAvatar"
                                        />
                                        <br />
                                        <Grid container justify="center">
                                            <Typography variant="caption">
                                            Rider: <b>{competitor.rider}</b>
                                            </Typography>
                                        </Grid>
                                        <Grid container justify="center">
                                            <Typography variant="caption">
                                            Horse: <b>{competitor.horse}</b>
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
};

Team.propTypes = {
    team: PropTypes.object.isRequired
};

export default withStyles(styles)(Team);