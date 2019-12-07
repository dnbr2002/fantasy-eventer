import React from 'react';

//Material UI
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import "./competitorCard.css";


const styles = theme => ({
    card: {
      width: 140,
      height: 205,
      paddingTop: 5,
    //   margin: "auto",
      margin: theme.spacing(1),
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
      }
    },
    media: {
      paddingTop: "75%",
    },
    content: {
      textAlign: "left",
      padding: theme.spacing(1)
    },
    divider: {
    //   margin: `${theme.spacing.unit * 3}px 0`
    },
    heading: {
      fontWeight: "bold"
    },
    subheading: {
      lineHeight: 1.8
    },
    footer: {
        fontWeight: "bold"
    }
  });

const CompetitorCard = ({classes, competitor}) =>  {
    return (
        <div className="App">
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={competitor.pic}
          />
          <CardContent className={classes.content}>
            <Typography
              className={"MuiTypography--heading"}
              variant={"h6"}
              gutterBottom
            >
              {competitor.rider}
            </Typography>
            <Typography
              className={"MuiTypography--heading"}
              color="textSecondary"
              variant={"h6"}
              gutterBottom
            >
              {competitor.horse}
            </Typography>
            <Typography
              className={"MuiTypography--subheading"}
              variant={"caption"}
            >
              {competitor.description}
            </Typography>
            <Divider className={classes.divider} />
            <Typography
              className={"MuiTypography--subheading"}
              variant={"caption"}
            >
              Score: {competitor.score}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

export default withStyles(styles)(CompetitorCard);
