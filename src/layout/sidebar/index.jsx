import React, { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

//Redux
// import useActions from 'react-redux';
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
    DescriptionOutlined as RulesIcon,
    QuestionAnswerOutlined as NewsfeedIcon,
    ContactSupportOutlined as ContactsIcon,
    DateRangeOutlined as ScheduleIcon,
    AccountBoxOutlined as AccountBoxIcon,
    BuildOutlined as BuildIcon
} from '@material-ui/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHorse } from '@fortawesome/free-solid-svg-icons'

// Component styles
import styles from './styles';

//Data
import { firebaseDb } from '../../firebase';

//loader
// import Loader from 'react-loaders'
import 'loaders.css/src/animations/line-scale.scss'


function Sidebar(props) {
    // console.log("SIDEBARPROPS::", props)

    // var loaderStyle = {
    //     color: 'black'
    // }
    // let loader = <Loader type="ball-scale" style={loaderStyle} active />
    const { classes, className, id, authenticated } = props;
    // const [auth] = useState(authenticated);
    const [pic, setPic] = useState("https://www.sackettwaconia.com/wp-content/uploads/default-profile.png")
    const [name, setName] = useState("");
    const [team, setTeam] = useState("");
    const [role, setRole] = useState("user");

    useLayoutEffect(
        () => {
            firebaseDb.ref(`users`).child(`${id}`).child(`${id}`).on('value', snapshot => {
                // console.log("PROFILENAME::", snapshot.val());
                if (snapshot.exists()) {
                    setName(snapshot.val().profileName);
                    setPic(snapshot.val().profilePic);
                    setTeam(snapshot.val().teamName);
                    setRole(snapshot.val().role);
                    // debugger;
                } else {

                }
            })
        }, [authenticated, id])

    // useEffect(
    // () => {

    // }, [])

    const rootClassName = classNames(classes.root, className);

    // console.log("SIDEBARPROPS2::", props)

    return (
        console.log("SIDEBARPROPS3::", props),
        <div>
            {role !== "admin" ?
                <nav className={rootClassName}>
                    {/* <div className={classes.logoWrapper}>
                        <Link
                            className={classes.logoLink}
                            to="/"
                        >
                            <img
                                alt="Brainalytica logo"
                                className={classes.logoImage}
                                src="/images/logos/sm.JPG"
                                height="50"
                                width="275"
                                hspace="20"
                            />
                        </Link>
                    </div> */}
                    {/* <Divider className={classes.logoDivider} /> */}
                    <br />
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
                                activeclassname={classes.activeListItem}
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
                                activeclassname={classes.activeListItem}
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
                                activeclassname={classes.activeListItem}
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
                                activeclassname={classes.activeListItem}
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
                        <a href="./schedulepage">
                            <ListItem
                                activeclassname={classes.activeListItem}
                                className={classes.listItem}
                            >
                                <ListItemIcon className={classes.listItemIcon}>
                                    <ScheduleIcon />
                                </ListItemIcon>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
                                    primary="Schedule"
                                />
                            </ListItem>
                        </a>
                        <a href="./rulespage">
                            <ListItem
                                activeclassname={classes.activeListItem}
                                className={classes.listItem}
                            >
                                <ListItemIcon className={classes.listItemIcon}>
                                    <RulesIcon />
                                </ListItemIcon>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
                                    primary="Rules"
                                />
                            </ListItem>
                        </a>
                        <a href="./newsfeedpage">
                            <ListItem
                                activeclassname={classes.activeListItem}
                                className={classes.listItem}
                            >
                                <ListItemIcon className={classes.listItemIcon}>
                                    <NewsfeedIcon />
                                </ListItemIcon>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
                                    primary="Newsfeed"
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
                        <a href="./contactpage">
                            <ListItem
                                activeclassname={classes.activeListItem}
                                className={classes.listItem}
                            >
                                <ListItemIcon className={classes.listItemIcon}>
                                    <ContactsIcon />
                                </ListItemIcon>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
                                    primary="Contact"
                                />
                            </ListItem>
                        </a>
                    </List>
                </nav>
                :
                <nav className={rootClassName}>
                    {/* <div className={classes.logoWrapper}>
                        <Link
                            className={classes.logoLink}
                            to="/"
                        >
                            <img
                                alt="Brainalytica logo"
                                className={classes.logoImage}
                                src="/images/logos/sm.JPG"
                                height="50"
                                width="275"
                                hspace="20"
                            />
                        </Link>
                    </div> */}
                    {/* <Divider className={classes.logoDivider} /> */}
                    <br />
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
                                activeclassname={classes.activeListItem}
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
                                activeclassname={classes.activeListItem}
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
                                activeclassname={classes.activeListItem}
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
                                activeclassname={classes.activeListItem}
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
                        <a href="./schedulepage">
                            <ListItem
                                activeclassname={classes.activeListItem}
                                className={classes.listItem}
                            >
                                <ListItemIcon className={classes.listItemIcon}>
                                    <ScheduleIcon />
                                </ListItemIcon>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
                                    primary="Schedule"
                                />
                            </ListItem>
                        </a>
                        <a href="./rulespage">
                            <ListItem
                                activeclassname={classes.activeListItem}
                                className={classes.listItem}
                            >
                                <ListItemIcon className={classes.listItemIcon}>
                                    <RulesIcon />
                                </ListItemIcon>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
                                    primary="Rules"
                                />
                            </ListItem>
                        </a>
                        <a href="./newsfeedpage">
                            <ListItem
                                activeclassname={classes.activeListItem}
                                className={classes.listItem}
                            >
                                <ListItemIcon className={classes.listItemIcon}>
                                    <NewsfeedIcon />
                                </ListItemIcon>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
                                    primary="Newsfeed"
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
                        <a href="./contactpage">
                            <ListItem
                                activeclassname={classes.activeListItem}
                                className={classes.listItem}
                            >
                                <ListItemIcon className={classes.listItemIcon}>
                                    <ContactsIcon />
                                </ListItemIcon>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
                                    primary="Contact"
                                />
                            </ListItem>
                        </a>
                        <ListItem
                            className={classes.listItem}
                            component="a"
                            href="./adminpage"
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                <BuildIcon />
                            </ListItemIcon>
                            <ListItemText
                                classes={{ primary: classes.listItemText }}
                                primary="Admin"
                            />
                        </ListItem>
                    </List>
                </nav>}
        </div>
    );
}

Sidebar.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
