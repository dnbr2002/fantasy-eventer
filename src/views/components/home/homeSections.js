import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Profile from "@material-ui/icons/AccountBoxOutlined";
import Rules from "@material-ui/icons/DescriptionOutlined";
// core components
import GridContainer from "../grid/gridContainer";
import GridItem from "../grid/gridItem.js";
import InfoArea from "../infoArea/infoArea";
import Horse from "../icon/horse";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHorse } from '@fortawesome/free-solid-svg-icons'

import styles from "./styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function HomeSections() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <Typography variant="h2" className={classes.title}>Ready, Set, Go!!</Typography >
              <Typography variant="h4" color="textSecondary" className={classes.description}>
                If your new to FE then get started right away.  Upate your Profile.
                Then make sure to review the rules of the game.  The basics are pick a group of 
                horse and riders and compete with other completed team rosters in the league.  Lowest score wins.
          </Typography>
            </GridItem>
          </GridContainer>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <a href="./profile">
                  <InfoArea
                    title="Profile"
                    description="Complete your FE profile."
                    icon={Profile}
                    iconColor="primary"
                    vertical
                  />
                </a>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <a href="./rulespage">
                  <InfoArea
                    title="Rules"
                    description="Learn the rules of FE."
                    icon={Rules}
                    iconColor="rose"
                    vertical
                  />
                </a>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <a href="./teampage">
                  <InfoArea
                    title="Team"
                    description="Setup up your FE team."
                    icon={Horse}
                    iconColor="black"
                    vertical
                  />
                </a>
              </GridItem>
            </GridContainer>
          </div>
    </div>
  );
}