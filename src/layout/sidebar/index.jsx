import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

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

// Icons
import {
    HomeOutlined as HomeIcon,
    PeopleOutlined as PeopleIcon,
    ShoppingBasketOutlined as ShoppingBasketIcon,
    LockOpenOutlined as LockOpenIcon,
    TextFields as TextFieldsIcon,
    ImageOutlined as ImageIcon,
    InfoOutlined as InfoIcon,
    AccountBoxOutlined as AccountBoxIcon,
    SettingsOutlined as SettingsIcon
} from '@material-ui/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHorse } from '@fortawesome/free-solid-svg-icons'

import Horse from '../../views/components/icon/horse'
// Component styles
import styles from './styles';

//Data
import { firebaseDb } from '../../firebase';

//loader
import Loader from 'react-loaders'
import 'loaders.css/src/animations/line-scale.scss'


function Sidebar(props) {
    console.log("SIDEBARPROPS::", props)

    var loaderStyle = {
        color: 'black'
    }
    let loader = <Loader type="ball-scale" style={loaderStyle} active />
    const { classes, className, id, authenticated } = props;
    const [pic, setPic] = useState(loader)
    const [name, setName] = useState("");
    const [team, setTeam] = useState("");

    useEffect(
        () => {
            firebaseDb.ref(`users`).child(`${id}`).child(`${id}`).once('value').then(snapshot => {
                console.log("PROFILENAME::", snapshot.exists());
                if (snapshot.exists()) {
                    setName(snapshot.val().profileName);
                    setPic(snapshot.val().profilePic);
                    setTeam(snapshot.val().teamName);
                }
            })
        }, [])

    const rootClassName = classNames(classes.root, className);

    return (
        <div>
            {authenticated ?
                <nav className={rootClassName}>
                    <div className={classes.logoWrapper}>
                        <Link
                            className={classes.logoLink}
                            to="/"
                        >
                            <img
                                alt="Brainalytica logo"
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
                        <Link to="/profile">
                            <Avatar
                                alt={name}
                                className={classes.avatar}
                                src={pic}
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
                    <List
                        component="div"
                        disablePadding
                    >
                        <a href="./">
                            <ListItem
                                activeClassName={classes.activeListItem}
                                className={classes.listItem}
                            >
                                <ListItemIcon className={classes.listItemIcon}>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
                                    primary="Home"
                                />
                            </ListItem>
                        </a>
                        <a href="./profile">
                        <ListItem
                            activeClassName={classes.activeListItem}
                            className={classes.listItem}
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText
                                classes={{ primary: classes.listItemText }}
                                primary="Profile"
                            />
                        </ListItem>
                        </a>
                        <a href="./teampage">
                        <ListItem
                            activeClassName={classes.activeListItem}
                            className={classes.listItem}
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                <FontAwesomeIcon icon={faHorse} />
                                {/* <Horse /> */}
                            </ListItemIcon>
                            <ListItemText
                                classes={{ primary: classes.listItemText }}
                                primary="Team"
                            />
                        </ListItem>
                        </a>
                        <a href="./leaguepage">
                        <ListItem
                            activeClassName={classes.activeListItem}
                            className={classes.listItem}
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText
                                classes={{ primary: classes.listItemText }}
                                primary="League"
                            />
                        </ListItem>
                        </a>
                    </List>
                    <Divider className={classes.listDivider} />
                    <List
                        component="div"
                        disablePadding
                        subheader={
                            <ListSubheader className={classes.listSubheader}>
                                Support
            </ListSubheader>
                        }
                    >
                        <ListItem
                            className={classes.listItem}
                            component="a"
                            href="https://devias.io/contact-us"
                            target="_blank"
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText
                                classes={{ primary: classes.listItemText }}
                                primary="Customer support"
                            />
                        </ListItem>
                    </List>
                </nav> : null}
        </div>
    );
    // }
}

Sidebar.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
