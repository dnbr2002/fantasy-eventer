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

const useStyles = makeStyles(styles);

export default function HomeSections() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s talk product</h2>
          <h5 className={classes.description}>
            This is the paragraph where you can write more details about your
            product. Keep you user engaged by providing meaningful information.
            Remember that by this time, the user is curious, otherwise he wouldn
            {"'"}t scroll to get here. Add a button if you want the user to see
            more.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Profile"
              description="Ensure you have a complete profile."
              icon={Profile}
              // iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Rules"
              description="Learn the rules of the game."
              icon={Rules}
              // iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Team"
              description="Make sure your team is set up before start time."
              icon={Horse}
              // iconColor="success"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}