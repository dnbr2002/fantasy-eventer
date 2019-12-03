import React, { useState, useEffect } from 'react';

//Material UI
import { Typography, LinearProgress } from '@material-ui/core';

// Material helpers
import { withStyles } from '@material-ui/core';


const styles = theme => ({
    root: {
        background: 'white',
        // position: '-webkit-sticky',
        position: 'sticky',
        top: 20,
        bottom: 0,
        paddingTop: '40px',
        paddingBottom: '40px',
        zIndex: 5,
    },
    details: {
        display: 'flex'
    },
    progressWrapper: {
        marginTop: theme.spacing(2)
    },
    linearProgress: {
        height: 20,
        // backgroundColor: theme.palette.common.white,
    },
});


export function ProgressBar(props) {
    const { profiledetail, classes } = props;
    const [completeness, setCompleteness] = useState(0)

    useEffect(() => {
        if (profiledetail) {
            setCompleteness(profiledetail.teamKeysTier1.split(",").filter(x => { return x.length !== 0 }).length + profiledetail.teamKeysTier2.split(",").filter(x => { return x.length !== 0 }).length)
        }
    }, [profiledetail])

    return (
        // console.log("PROGRESS::", props),
        <div>
            {completeness > 8 ?
                <div className={classes.progressWrapper}>
                    <Typography variant="h3" color="textSecondary">Team Selection {completeness * 10 + 10}% Complete</Typography>
                    <br />
                    <LinearProgress
                        className={classes.linearProgress}
                        value={completeness * 10 + 10}
                        variant="determinate"
                        position="fixed"
                    /> </div> :
                <div className={classes.progressWrapper}>
                    <Typography variant="h3" color="textSecondary">Team Selection {completeness * 10}% Complete</Typography>
                    <br />
                    <LinearProgress
                        className={classes.linearProgress}
                        value={completeness * 10}
                        variant="determinate"
                        position="fixed"
                    />
                </div>}
        </div>

    )

}

export default withStyles(styles)(ProgressBar);