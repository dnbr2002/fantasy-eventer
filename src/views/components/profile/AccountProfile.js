import React, { useState, useEffect }  from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Avatar, CircularProgress, Typography } from '@material-ui/core';


// Shared components
import Portlet from '../../components/Portlet';
import PortletContent from '../../components/PortletContent';
import PortletFooter from '../../components/PortletFooter';


const styles = theme => ({
    root: {},
    details: {
      display: 'flex'
    },
    info: {},
    locationText: {
      marginTop: theme.spacing(1),
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
    progressBar: {
      position: "-webkit-sticky",
      top: 0
    },
    sticky: {
      background: 'white',
      // position: '-webkit-sticky',
      position: 'sticky',
      top: 10,
      bottom: 0,
      paddingTop: '10px',
      paddingBottom: '10px',
      zIndex: 5,
      // paddingTop: 0,
      // paddingBottom: 0,
    },
    progressWrapper: {
      marginTop: theme.spacing(2)
    },
    uploadButton: {
      marginRight: theme.spacing(2)
    },
    linearProgress: {
      height: 10
    },
    name: {
      marginLeft: 'auto',
      // marginRight: -1,
    },
    loader: {
      paddingTop: '48px',
      paddingBottom: '24px',
      display: 'flex',
      justifyContent: 'center'
    }
  });


function AccountProfile(props) {
  // console.log("ACCTPROFPROPS::",props);
  const { classes, className, profileDetail, ...rest } = props;
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(true);
  const [countryFlag, setCountryFlag] = useState("");
  const [countryName, setCountryName] = useState("");
  const [eventScore, setEventScore] = useState(0)
  const [eventRank, setEventRank] = useState(0);
  // const [tier1Count, setTier1Count] = useState(0);
  // const [tier2Count, setTier2Count] = useState(0);
  // const [completeness, setCompleteness] = useState(0)


  useEffect(() => {
      if(profileDetail){
        setName(profileDetail.profileName);
        setTeam(profileDetail.teamName);
        setPic(profileDetail.profilePic);
        setCountryName(profileDetail.country);
        setCountryFlag("https://www.countryflags.io/" + profileDetail.country + "/shiny/64.png");
        setEventScore(profileDetail.score);
        setEventRank(profileDetail.rank);
        setLoading(false);
        // setTier1Count(profileDetail.teamKeysTier1.split(",").filter(x => {return x.length !== 0}).length)
        // setTier2Count(profileDetail.teamKeysTier2.split(",").filter(x => {return x.length !== 0}).length)
        // setCompleteness(profileDetail.teamKeysTier1.split(",").filter(x => {return x.length !== 0}).length + profileDetail.teamKeysTier2.split(",").filter(x => {return x.length !== 0}).length)
      }
  }, [profileDetail])



    const rootClassName = classNames(classes.root, className);
    if (loading) {
      return (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      );
    }
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
              
        </PortletFooter>
      </Portlet>
    );
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);