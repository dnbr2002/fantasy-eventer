import React, { Component } from 'react';
import PropTypes from "prop-types";

//Redux Actions
import CardActions from "@material-ui/core/CardActions";

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
      width: 200,
      height: 225,
    //   margin: "auto",
      margin: theme.spacing(1),
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
      }
    },
    media: {
      paddingTop: "50%"
    },
    content: {
      textAlign: "left",
      padding: theme.spacing.unit * 3
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

class CompetitorCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    //   profileName: '',
    //   teamName: '',
    //   profilePic: '',
    //   score: 0
    };
  }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.profile.list.get(0)) {
//       // console.log("TEAMCARDCWRP::", nextProps.profile.list.get(0))
//       if (nextProps.profile.list.get(0).profileName !== this.state.profileName) {
//         this.setState({ profileName: nextProps.profile.list.get(0).profileName });
//       }
//       if (nextProps.profile.list.get(0).teamName !== this.state.teamName) {
//         this.setState({ teamName: nextProps.profile.list.get(0).teamName });
//       }
//       if (nextProps.profile.list.get(0).profilePic !== this.state.profilePic) {
//         this.setState({ profilePic: nextProps.profile.list.get(0).profilePic });
//       }
//       if (nextProps.profile.list.get(0).score !== this.state.score) {
//         this.setState({ score: nextProps.profile.list.get(0).score });
//       }
//     }
//   }

  render() {
    const { classes, competitor } = this.props;
    console.log('COMPCARDPROPS::', this.props)
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
}

CompetitorCard.propTypes = {
  classes: PropTypes.object.isRequired,
  renderAddTeamName: PropTypes.func,
};

export default withStyles(styles)(CompetitorCard);
