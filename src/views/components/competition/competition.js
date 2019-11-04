import React from 'react';
import PropTypes from 'prop-types';
import {
    Divider,
    Grid,
    Paper,
    Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

//custom components
import Portlet from '../../components/Portlet';
import PortletContent from '../../components/PortletContent';

const styles = theme => ({
    root: {
        flexGrow: 1,
        // paddingTop: 0,
    },
    paper: {
        // height: 175,
        // width: 100,
        // margin: theme.spacing(1)
    },
    image: {
        float: "left",
        paddingRight: 24,
        // height: 100,
         width: 600,
    },
    paperDivider: {
        width: '100%'
    }
});


const Competition = ({ classes, competition }) => {
    console.log("Comp::", competition);
    if (competition && competition.list.size > 0) {
        let sortedCompetition = competition.list.sort((a, b) => new Date(...b.date.split('/')) - new Date(...a.date.split('/')));
        return (
            <div>
                {sortedCompetition.map(comp => (
                    <Portlet>
                        <PortletContent>
                            <Grid key={comp.key} item>
                                {/* <Paper className={classes.paper} > */}
                                <Grid>
                                    <img
                                        className={classes.image}
                                        src={comp.pic}
                                        alt="competition pic"
                                    />
                                    {/* <Divider className={classes.paperDivider} /> */}
                               
                                        <Typography variant="h2">
                                            Event: <b>{comp.name}</b>
                                        </Typography>
                                        <br />
                                        <Typography variant="h3">
                                            Date: <b>{comp.date}</b>
                                        </Typography>
                                        <br />
                                        <Typography variant="h4">
                                            Location: <b>{comp.location}</b>
                                        </Typography>
                                        <br />
                                        <Typography variant="subtitle1">
                                            Link: <a href={comp.url}>{comp.url}</a>
                                        </Typography>
                                        <br />
                                        <Typography variant="subtitle1">
                                            Desc: <b>{comp.desc}</b>
                                        </Typography>
                                </Grid>
                                {/* </Paper> */}
                            </Grid>
                        </PortletContent>
                    </Portlet>
                ))}
            </div>
        );
    }
    else {
        return (<div>
            <Typography
                variant="h3"
                color="textSecondary"
            >
                Event Schedules
          </Typography>
            <Typography
                variant="body1"
                color="textSecondary"
            >
                No Events scheduled at this time.  Event Schedule subject to change as we add or remove events.
          </Typography>
        </div>);
    }
};

Competition.propTypes = {
    Competition: PropTypes.object.isRequired
};

export default withStyles(styles)(Competition);