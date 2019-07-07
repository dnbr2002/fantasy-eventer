import React, { useState, useEffect, useLayoutEffect }  from 'react';

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

//Data
import { firebaseDb } from '../../../firebase';

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
    teamText: {
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


function AccountProfile(props) {
  console.log("ACCTPROFPROPS::",props);
  const { classes, className, profile, ...rest } = props;
  var today = new Date()
  // date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
  const [date] = useState((today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear())
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [pic, setPic] = useState("");
  const [countryFlag, setCountryFlag] = useState("");
  const [countryName, setCountryName] = useState("");
  const [eventScore, setEventScore] = useState(0)
  const [eventRank, setEventRank] = useState(0);


  useEffect(() => {
      if(profile){
        setName(profile.profileName);
        setTeam(profile.teamName);
        setPic(profile.profilePic);
        setCountryName(profile.country);
        setCountryFlag("https://www.countryflags.io/" + profile.country + "/shiny/64.png");
        setEventScore(profile.score);
        setEventRank(profile.rank);
      }
  }, [profile])



    const rootClassName = classNames(classes.root, className);
    console.log("APPROPS::",countryFlag);
    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h3">Name: {name}</Typography>
              <img src={countryFlag} width="70" height="60" alt={countryName} />
            </div>
            <Avatar
              className={classes.avatar}
              src={pic}
            />
          </div>
        </PortletContent>
        <PortletFooter>
        <Typography
                className={classes.teamText}
                variant="h3"
              >
               Team: {team}
              </Typography>
              <Typography
                className={classes.teamText}
                variant="h4"
              >
               Event Score: {eventScore}
              </Typography>
              <Typography
                className={classes.teamText}
                variant="h4"
              >
               Event Rank: {eventRank}
              </Typography>
        </PortletFooter>
      </Portlet>
    );
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);