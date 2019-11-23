import React, { Component } from 'react';
import PropTypes from "prop-types";

//Redux Actions
import CardActions from "@material-ui/core/CardActions";

//Material UI
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  profilebtn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  }
});


class TeamCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profileName: '',
      teamName: '',
      profilePic: '',
      score: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.list.get(0)) {
      // console.log("TEAMCARDCWRP::", nextProps.profile.list.get(0))
      if (nextProps.profile.list.get(0).profileName !== this.state.profileName) {
        this.setState({ profileName: nextProps.profile.list.get(0).profileName });
      }
      if (nextProps.profile.list.get(0).teamName !== this.state.teamName) {
        this.setState({ teamName: nextProps.profile.list.get(0).teamName });
      }
      if (nextProps.profile.list.get(0).profilePic !== this.state.profilePic) {
        this.setState({ profilePic: nextProps.profile.list.get(0).profilePic });
      }
      if (nextProps.profile.list.get(0).score !== this.state.score) {
        this.setState({ score: nextProps.profile.list.get(0).score });
      }
    }
  }

  render() {
    const { classes } = this.props;
    // console.log('TEAMCARDPROPS::', this.props)
    return (
      <Card className={classes.root}>

        <Grid container spacing={16}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={this.state.profilePic} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="display1">Team: {this.state.teamName}</Typography>
                <br />
                <br />
                <Typography gutterBottom variant="headline">Player: {this.state.profileName}</Typography>
                <br />
                <br />
                <Typography color="textSecondary" variant="subheading">Leagues: </Typography>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
            <Grid item>
              <div>
                <Typography variant="display1">Team Score: {this.state.score}</Typography>
                <br />
                <br />
                <CardActions>
                  <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    href="./profile" >
                    Update Profile
            </Button>
                </CardActions>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

TeamCard.propTypes = {
  classes: PropTypes.object.isRequired,
  renderAddTeamName: PropTypes.func,
};

export default withStyles(styles)(TeamCard);
