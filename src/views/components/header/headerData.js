import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ProfileIcon from '@material-ui/icons/AccountCircle'
import TeamIcon from '@material-ui/icons/List';
import LeagueIcon from '@material-ui/icons/Group';
import AdminIcon from '@material-ui/icons/Settings';
import TasksIcon from '@material-ui/icons/ViewList';


export const mailFolderListItems = (
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

export const otherMailFolderListItems = (
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