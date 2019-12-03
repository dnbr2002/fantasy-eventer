import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import styles from "./styles";

const useStyles = makeStyles(styles);

export default function InfoArea(props) {
  const classes = useStyles();
  const { title, description, iconColor, vertical } = props;
  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical
  });
  const iconClasses = classNames({
    [classes.icon]: true,
    [classes.iconVertical]: vertical
  });
  return (
    <div className={classes.infoArea}>
      <Card className={classes.card}>
        <CardContent>
      <div className={iconWrapper}>
        <props.icon className={iconClasses} />
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
      </CardContent>
      </Card>
    </div>
  );
}

InfoArea.defaultProps = {
  iconColor: "gray",
};

InfoArea.propTypes = {
  icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray", 
    "black"
  ]),
  vertical: PropTypes.bool
};