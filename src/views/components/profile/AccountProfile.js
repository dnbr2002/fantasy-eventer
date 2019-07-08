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
    },
    linearProgress: {
      height: 10
    },
    name: {
      marginLeft: 'auto',
      // marginRight: -1,
    }
  });


function AccountProfile(props) {
  console.log("ACCTPROFPROPS::",props);
  const { classes, className, profileDetail, ...rest } = props;
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
  const [tier1Count, setTier1Count] = useState(0);
  const [tier2Count, setTier2Count] = useState(0);
  const [completeness, setCompleteness] = useState(0)


  useEffect(() => {
      if(profileDetail){
        setName(profileDetail.profileName);
        setTeam(profileDetail.teamName);
        setPic(profileDetail.profilePic);
        setCountryName(profileDetail.country);
        setCountryFlag("https://www.countryflags.io/" + profileDetail.country + "/shiny/64.png");
        setEventScore(profileDetail.score);
        setEventRank(profileDetail.rank);
        setTier1Count(profileDetail.teamKeysTier1.split(",").filter(x => {return x.length != 0}).length)
        setTier2Count(profileDetail.teamKeysTier2.split(",").filter(x => {return x.length != 0}).length)
        setCompleteness(profileDetail.teamKeysTier1.split(",").filter(x => {return x.length != 0}).length + profileDetail.teamKeysTier2.split(",").filter(x => {return x.length != 0}).length)
      }
  }, [profileDetail])



    const rootClassName = classNames(classes.root, className);
    console.log("KEYS1::",tier1Count);
    console.log("KEYS2::",tier2Count);
    console.log("KEYS3::",completeness);
    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
            <Typography
                className={classes.teamText}
                variant="h3"
              >
               Team: {team}
              </Typography>
              <img src={countryFlag} width="70" height="60" alt={countryName} />
            </div>
            <Avatar
              className={classes.avatar}
              src={pic}
            />
          </div>
        </PortletContent>
        <PortletFooter>
          <div className={classes.details}>
              <Typography
                className={classes.teamText}
                variant="h4"
              >                
               Event Score: {eventScore}
              </Typography>
              <Typography
                className={classes.name}
                variant="h4"
              >                
               Name: {name}
              </Typography>
              </div>
              <Typography
                className={classes.teamText}
                variant="h4"
              >
               Event Rank: {eventRank}
              </Typography>
              
              {completeness > 8 ?
              <div className={classes.progressWrapper}>
             <Typography variant="body1">Team Selection Completeness: {completeness * 10 + 10}%</Typography>
            <LinearProgress
              className={classes.linearProgress}
              value={completeness * 10 + 10}
              variant="determinate"
            /> </div> : 
            <div className={classes.progressWrapper}>
            <Typography variant="body1">Team Selection Completeness: {completeness * 10}%</Typography>
            <LinearProgress
              className={classes.linearProgress}
              value={completeness * 10}
              variant="determinate"
            />

          </div>}
        </PortletFooter>
      </Portlet>
    );
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);