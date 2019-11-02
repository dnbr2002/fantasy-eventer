import React, { Component } from 'react'
import classNames from 'classnames';
// Material helpers
import { withStyles, Typography, LinearProgress, Paper, Divider } from '@material-ui/core';

// Icons
import {
    EmailOutlined
} from '@material-ui/icons';

import TwitterIcon from '@material-ui/icons/Twitter';

import {
    FormControlLabel,
    IconButton
} from '@material-ui/core';


// Shared components
import Portlet from '../../components/Portlet';
import PortletContent from '../../components/PortletContent';
import PortletFooter from '../../components/PortletFooter';

// Component styles
const styles = theme => ({
    root: {
        padding: theme.spacing(4),
        // display: "flex",
        // justifyContent: "space-between"
    },
    email: {
        textAlign: 'center',
        display: 'block' 
    },
    twitter: {
        textAlign: 'center',
        display: 'block'
    },
});

class ContactPage extends Component {
    render() {
        const { classes, className } = this.props;
        const rootClassName = classNames(classes.root, className);
        return (
            <div className={rootClassName}>
                <Portlet className={classes.root} >
                    <PortletContent >
                        <div>
                            <Typography variant="h3" color="textSecondary" className={classes.email}>Contact us with questions.</Typography>
                            <Typography variant="h3" color="textSecondary" className={classes.email}>Well get back to you as soon as we can.</Typography>
                            <br />
                            <br />
                            <Typography variant="h4" color="textSecondary" className={classes.email}>Email</Typography>
                            <FormControlLabel
                                control={
                                    <a target="_top"
                                        rel="noopener noreferrer"
                                        variant="h3"
                                        href="mailto:fantasyeventer@gmail.com">
                                        <IconButton color="primary" size="medium">
                                            <EmailOutlined  /> {/* icon */}
                                        </IconButton>
                                    </a>
                                }
                                className={classes.email}
                                label={"fantasyeventer@gmail.com"}
                                labelPlacement="end"
                            />
                            <br />
                            <br />
                            <Divider />
                            <br />
                            <Typography variant="h3" color="textSecondary" className={classes.email}>Find us on Social Media.</Typography>
                            <br />
                            <br />
                            <Typography variant="h4" color="textSecondary" className={classes.twitter}>Twitter</Typography>
                            <FormControlLabel
                                control={
                                    <a target="_top"
                                        rel="noopener noreferrer"
                                        variant="h3"
                                        href="https://twitter.com/EventerFantasy">
                                        <IconButton color="primary" size="medium">
                                            <TwitterIcon /> {/* icon */}
                                        </IconButton>
                                    </a>
                                }
                                className={classes.twitter}
                                label={"https://twitter.com/EventerFantasy"}
                                labelPlacement="end"
                            />
                            
                        </div>
                    </PortletContent>
                </Portlet>
            </div >
        )
    }
}

export default withStyles(styles)(ContactPage);