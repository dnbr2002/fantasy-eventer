import React, { Component } from 'react';

// Material helpers
import {
    withStyles,
    Typography,
} from '@material-ui/core';
//import PropTypes from 'prop-types'

//Custom Components
import Portlet from '../../components/Portlet';
import PortletContent from '../../components/PortletContent';
import PortletHeader from '../../components/Portlet';

// Component styles
const styles = theme => ({
    root: {
        padding: theme.spacing(4)
    }
});

class RulesPage extends Component {
    render() {
        return (
            <div>
                <br />
                <Portlet>
                    <PortletHeader>
                        <Typography variant="h1" component="h2">
                            <br />
                            &nbsp;&nbsp;Fantasy Eventer Rules
                            <br />
                            <br />
                        </Typography>
                    </PortletHeader>
                    <PortletContent>
                        <Typography variant="h3" component="h3">
                            1.1 Team Setup
                    </Typography>
                    </PortletContent>
                    <PortletContent>
                        <Typography variant="subtitle1">
                            <blockquote>
                                1.1.1 Team consists of 9 players you select up to 1 hour before start time of major FE Event.  3 Tier One Competitor, 6 Tier Two Competitors.
                                <br />
                                <br />
                                1.1.2 Selections can start as early as the first public posting of horse and rider pairs for said event and are subject to change up to 1 hour before start of event.  Its your responsibility to keep checking for addition/change/removal of competitors before the event to ensure a coomplete team.
                                <br />
                                <br />
                                1.1.3 One hour before the event the start the ability to select competitors for to team rosters will be locked.
                                <br />
                                <br />
                                1.1.4 Only team rosters will a complete team will be entered in the league and will recieve a qualifying score.  Incomplete rosters, teams with less than 3 Tier Oee and 6 Tier Two Competitors our effectively removed from the competition pool.
                        </blockquote>
                        </Typography>
                    </PortletContent>
                    <PortletContent>
                        <Typography variant="h3" component="h3">
                            1.2 Scoring
                    </Typography>
                    </PortletContent>
                    <PortletContent>
                        <Typography variant="subtitle1">
                            <blockquote>
                                1.2.1 Combined score of 3 Tier One Competitors and 6 Tier Two Competitors equals total Team Score.
                                <br />
                                <br />
                                1.2.2 Low score wins, just like real eventing.
                                <br />
                                <br />
                                1.2.3 Scores may be updated through out the day but will be updated more completely at the conclusion of each day days competition.
                                <br />
                                <br />
                                1.2.4 Scores are subject to change at any time based on scoring adjustments at the event for competitors throughout the event.
                        </blockquote>
                        </Typography>
                    </PortletContent>
                    <PortletContent>
                        <Typography variant="h3" component="h3">
                            1.3 Disclaimer
                    </Typography>
                    </PortletContent>
                    <PortletContent>
                        <Typography variant="subtitle1">
                            <blockquote>
                                1.3.1 This a fantasy game site not a betting site.  While we promise to make every effort to give you the best fantasy game experience we make no gaurantees about the accuracy of the information on this site in regards to stats and scores.
                        </blockquote>
                        </Typography>
                    </PortletContent>
                </Portlet>
            </div>
            // <div className={rootClassName}>
            // <div className="g-row">
            //     <div className="g-col">
            //     <div className="bootstrap">
            //     <div className="jumbotron">
            //         <h1 className="display-3">Rules</h1>
            //         </div>
            //         </div>
            //     </div>
            // </div>
            // </div>
        )
    }
}

export default withStyles(styles)(RulesPage);
