import React, { Component } from 'react'
import classNames from 'classnames';
// Material helpers
import { withStyles, Typography, LinearProgress, Paper, Divider } from '@material-ui/core';

// Icons
import {
EmailOutlined
} from '@material-ui/icons';

// Shared components
import Portlet from '../../components/Portlet';
import PortletContent from '../../components/PortletContent';
import PortletFooter from '../../components/PortletFooter';

// Component styles
const styles = theme => ({
    root: {
      padding: theme.spacing(4)
    },
    email: {
        textAlign: 'center'
    },
    twitter: {
        textAlign: 'center'
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
                    <Typography variant="h2" color="textSecondary" className={classes.email}>Contacts</Typography>
                    <br /> 
                        <br />
                        <div className={classes.email}><EmailOutlined>Email</EmailOutlined>
                        {/* <Typography variant="h3" color="textSecondary" className={classes.email}>Email</Typography> */}
                        </div>
                        <br /> 
                        <br />
                        <Divider />
                        <br /> 
                        <br />
                        <Typography variant="h3" color="textSecondary"className={classes.twitter}>Twitter</Typography>
                    </div>                    
            </PortletContent>
        </Portlet>
            </div>
        )
    }
}

export default withStyles(styles)(ContactPage);