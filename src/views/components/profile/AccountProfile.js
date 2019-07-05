import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Avatar, Typography, Button, LinearProgress } from '@material-ui/core';

// Shared components
import Portlet from '../../components/Portlet';
import PortletContent from '../../components/PortletContent';
import PortletFooter from '../../components/PortletFooter';

// Component styles
// import styles from './styles';

const styles = theme => ({
    root: {},
    details: {
      display: 'flex'
    },
    info: {},
    locationText: {
      marginTop: theme.spacing.unit,
      color: theme.palette.text.secondary
    },
    dateText: {
      color: theme.palette.text.secondary
    },
    avatar: {
      marginLeft: 'auto',
      height: '110px',
      width: '110px',
      flexShrink: 0,
      flexGrow: 0
    },
    progressWrapper: {
      marginTop: theme.spacing.unit * 2
    },
    uploadButton: {
      marginRight: theme.spacing.unit * 2
    }
  });


class AccountProfile extends Component {
    constructor() {
        super();
        var today = new Date(),
            date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()

        this.state = {
            date: date
        };
    }
  render() {
    const { classes, className, profile, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);
    console.log("APPROPS::",this.props);
    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">{profile.profileName}</Typography>
              <Typography
                className={classes.locationText}
                variant="body1"
              >
                {profile.teamName}
              </Typography>
              <Typography
                className={classes.dateText}
                variant="body1"
              >
               {this.state.date}
              </Typography>
            </div>
            <Avatar
              className={classes.avatar}
              src={profile.profilePic}
            />
          </div>
          <div className={classes.progressWrapper}>
            <Typography variant="body1">Profile Completeness: 70%</Typography>
            <LinearProgress
              value={70}
              variant="determinate"
            />
          </div>
        </PortletContent>
        <PortletFooter>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text"
          >
            Upload picture
          </Button>
          <Button variant="text">Remove picture</Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);