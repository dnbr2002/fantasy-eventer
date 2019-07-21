import React, { useState, useEffect } from 'react';

//Material UI
import { Typography, LinearProgress, Paper } from '@material-ui/core';

// Material helpers
import { withStyles } from '@material-ui/core';

// Shared components
import Portlet from '../../components/Portlet';
import PortletContent from '../../components/PortletContent';
import PortletFooter from '../../components/PortletFooter';

const styles = theme => ({
    root: {},
    details: {
        display: 'flex'
    },
    progressWrapper: {
        marginTop: theme.spacing(2)
    },
    linearProgress: {
        height: 20
    },
});


export function ProgressBar(props) {
    const { profileDetail, classes } = props;
    const [completeness, setCompleteness] = useState(0)

    useEffect(() => {
        if (profileDetail) {
            setCompleteness(profileDetail.teamKeysTier1.split(",").filter(x => { return x.length != 0 }).length + profileDetail.teamKeysTier2.split(",").filter(x => { return x.length != 0 }).length)
        }
    }, [profileDetail])

    return (
        <Portlet className={classes.portlet} classes={{background: 'white'}}>
            <PortletContent classes={{background: 'white'}}>
                {completeness > 8 ?
                    <div className={classes.progressWrapper}>
                        <Typography variant="h3" color="textSecondary">Team Selection Completeness: {completeness * 10 + 10}%</Typography>
                        <br /> 
                        <br />
                        <LinearProgress
                            className={classes.linearProgress}
                            value={completeness * 10 + 10}
                            variant="determinate"
                            position="fixed"
                        /> </div> :
                    <div className={classes.progressWrapper}>
                        <Typography variant="h3" color="textSecondary">Team Selection Completeness: {completeness * 10}%</Typography>
                        <br /> 
                        <br />
                        <LinearProgress
                            className={classes.linearProgress}
                            value={completeness * 10}
                            variant="determinate"
                            position="fixed"
                        />
                    </div>}
            </PortletContent>
        </Portlet>

    )

}

export default withStyles(styles)(ProgressBar);