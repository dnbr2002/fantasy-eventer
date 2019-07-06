import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ProfileIcon from '@material-ui/icons/AccountCircle'
import TeamIcon from '@material-ui/icons/List';
import LeagueIcon from '@material-ui/icons/Group';
import AdminIcon from '@material-ui/icons/Settings';
import TasksIcon from '@material-ui/icons/ViewList';
// Material components
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography
} from '@material-ui/core';
//loader
import Loader from 'react-loaders'
import 'loaders.css/src/animations/line-scale.scss'

// Material helpers
import { withStyles } from '@material-ui/core/styles';
import { firebaseDb } from '../../../firebase';
import styles from './styles';

const defaultProfile = {
  profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSbKocOHG3dan_M0mG_jlwZysGmg2rIgkTermzsv61yrmW7mcgUQ",
  profileName: "default",
  teamName: "defaultTeam"
}

export function TopHeaderDataItem(props) {
  console.log("HEADERPROPS::", props);
  var loaderStyle = {
    color: 'black'
  }
  let loader = <Loader type="ball-scale" style={loaderStyle} active />
  const { classes, id } = props;
  const [pic, setPic] = useState(loader)
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");

  useEffect(
    () => {
      firebaseDb.ref(`users`).child(`${id}`).child(`${id}`).once('value').then(snapshot => {
        console.log("PROFILENAME::",snapshot.exists());
        if(snapshot.exists()){
          setName(snapshot.val().profileName);
          setPic(snapshot.val().profilePic);
          setTeam(snapshot.val().teamName);
        }       
      })
    }, [])

  return (
    <List>
      <div className={classes.logoWrapper}>
        <Link
          className={classes.logoLink}
          to="/"
        >
          <img
            alt="Fantasy Eventer"
            className={classes.logoImage}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhlALV-ZF5Ubd9k41MsSepJPy3wVj14HSUQdhPGvMhCXmw1NBOMA"
            height="25"
            width="150"
            hspace="20"
          />
        </Link>
      </div>
      <Divider className={classes.logoDivider} />
      <div className={classes.profile}>
        <Link to="/account">
          <Avatar
            alt={name}
            className={classes.avatar}
            src={pic}
            hspace="20"
          />
        </Link>
        <Typography
          className={classes.nameText}
          variant="h6"
        >
          {name}
          </Typography>
        <Typography
          className={classes.bioText}
          variant="caption"
        >
          {team}
          </Typography>
      </div>
      <Divider className={classes.profileDivider} />
    </List>
  )
}

// export default withStyles(styles)(TopHeaderDataItem);

export const MailFolderListItems = (
  <div>
    <a href="./">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </a>
    <a href="./profile">
      <ListItem button>
        <ListItemIcon>
          <ProfileIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </a>
    <a href="./teampage">
      <ListItem button>
        <ListItemIcon>
          <TeamIcon />
        </ListItemIcon>
        <ListItemText primary="Stable" />
      </ListItem>
    </a>
    <a href="./leaguepage">
      <ListItem button>
        <ListItemIcon>
          <LeagueIcon />
        </ListItemIcon>
        <ListItemText primary="League" />
      </ListItem>
    </a>
  </div>
);

export const OtherMailFolderListItems = (
  <div>
    <a href="./adminpage">
      <ListItem button>
        <ListItemIcon>
          <AdminIcon />
        </ListItemIcon>
        <ListItemText primary="Admin" />
      </ListItem>
    </a>
    <a href="./taskspage">
      <ListItem button>
        <ListItemIcon>
          <TasksIcon />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
      </ListItem>
    </a>
  </div>
);