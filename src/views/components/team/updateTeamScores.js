import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Update from '@material-ui/icons/Update';

//Material UI
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';


import toArray from 'lodash/toArray';

//Custom Components
import Portlet from '../../components/Portlet';
import PortletHeader from '../../components/PortletHeader';
import PortletContent from '../../components/PortletContent';

import { firebaseDb } from '../../../firebase/index';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3
    // paddingTop: 0,
  },
  content: {
    display: 'flex',
    alignItems: 'center'
  },
});


class UpdateScores extends Component {
  static propTypes = {
    bulkUpdateScores: PropTypes.func.isRequired
  };

  constructor() {
    super()
    this.state = {
      counter: 0,
      open: false,
      proceed: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleProceed = () => {
    console.log("UPDATESCORE1::", this.state.proceed);   
    this.setState({ open: false });
    this.setState({ proceed: true });    
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleUpdateEventScore = (competitors) => {
    // console.log("UPDATESCORE::", competitors);
    // this.props.bulkUpdateScores(competitors)
    var hucounter = 0;
    firebaseDb.ref('users').once('value').then(snapshot => {
      const users = toArray(snapshot.val());
      // console.log("USERS::", users);
      users.forEach(user_id => {
        const record = user_id[Object.keys(user_id)[0]];
        var teamstring = record.teamKeysTier1 + ',' + record.teamKeysTier2
        var team = teamstring.split(',');
        // eslint-disable-next-line
        let scores = []
        team.map(key => {
          // eslint-disable-next-line
          return competitors.map(competitor => {
            if (key === competitor.key) {
              scores.push(Number(competitor.score))
            }
          })
        })
        const score = scores.reduce((total, value) => total + value, 0);
        firebaseDb.ref(`users/${record.uid}/${record.uid}/score`).set(score.toString());
        hucounter++
        this.setState({ counter: hucounter })
      })
    });
  }

  handleUpdateTotalScore = (competitors) => {
    this.handleClose();
    console.log("UPDATESCORE::", competitors);          // this.props.bulkUpdateScores(competitors)
    var hucounter = 0;
    console.log("UPDATESCORE1::", this.state.proceed);   
      firebaseDb.ref('users').once('value').then(snapshot => {
        const users = toArray(snapshot.val());
        console.log("USERS::", users);
        users.forEach(user_id => {
          const record = user_id[Object.keys(user_id)[0]];
          var teamstring = record.teamKeysTier1 + ',' + record.teamKeysTier2
          console.log("UPDATESCORE::2", teamstring);
          var team = teamstring.split(',');
          console.log("UPDATESCORE::3", team);
          // eslint-disable-next-line
          let scores = []
          team.map(key => {
            // eslint-disable-next-line
            return competitors.map(competitor => {
              if (key === competitor.key) {
                scores.push(Number(competitor.score))
              }
            })
          })
          const score = scores.reduce((total, value) => total + value, 0);
          const totalScore = Number(record.totalScore) + score;
          console.log("UPDATESCORE::4", totalScore);
          firebaseDb.ref(`users/${record.uid}/${record.uid}/totalScore`).set(totalScore.toString());
          hucounter++
          this.setState({ counter: hucounter })
        })
      });
  }

  render() {
    console.log("UPDATESCORES::", this.props)
    const { counter } = this.state
    return (
      // <div className="form">
      <div>
        <Portlet>
          <PortletHeader>
            <Typography variant="h3">Update Teams Event Score</Typography>
          </PortletHeader>
          <PortletContent>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              id="updateScoresBtn"
              onClick={() => this.handleUpdateEventScore(this.props.competitors)}>
              <Update /> &nbsp;
                        Update Teams Event Score
                        </Button>
            <br />
            <br />
            <Typography variant="h4" color="textSecondary">Updated Teams Event Score Counter: {counter}</Typography>
          </PortletContent>
          <PortletHeader>
            <Typography variant="h3">Update Teams Total Score</Typography>
          </PortletHeader>
          <PortletContent>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              id="updateScoresBtn"
              onClick={() => this.handleClickOpen()}>
              <Update /> &nbsp;
                                                Update Teams Annual Total Score
                                                </Button>
            <br />
            <br />
            <Typography variant="h4" color="textSecondary">Updated Teams Annual Total Score Counter: {counter}</Typography>
          </PortletContent>
        </Portlet>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure??"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Make sure to only run this once between events.
          </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Cancel
          </Button>
              <Button onClick={() => this.handleUpdateTotalScore(this.props.competitors)} color="primary" autoFocus>
                Proceed
          </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(UpdateScores);
