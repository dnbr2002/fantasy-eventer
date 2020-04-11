import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Update from '@material-ui/icons/Update';

//Material UI
import { withStyles } from '@material-ui/core/styles';
import {
    Typography
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
            counter: 0
        };
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate(competitors) {
            console.log("UPDATESCORE::",competitors);
            // this.props.bulkUpdateScores(competitors)
                var hucounter = 0;
                firebaseDb.ref('users').once('value').then(snapshot => {
                    const users = toArray(snapshot.val());
                    console.log("USERS::", users);
                    users.forEach(user_id => {
                      const record = user_id[Object.keys(user_id)[0]];
                      var teamstring = record.teamKeysTier1 + ',' + record.teamKeysTier2
                      console.log("UPDATESCORE::2",teamstring);
                      var team = teamstring.split(',');
                      console.log("UPDATESCORE::3",team);
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
                      console.log("UPDATESCORE::4",totalScore);
                      firebaseDb.ref(`users/${record.uid}/${record.uid}/score`).set(score.toString());
                      firebaseDb.ref(`users/${record.uid}/${record.uid}/totalScore`).set(totalScore.toString());
                      hucounter++
                      this.setState({counter: hucounter})
                    })
                  });
    }

    render() {
        console.log("UPDATESCORES::",this.props)
        const { counter } = this.state
        return (
                // <div className="form">
                <Portlet>
                <PortletHeader>
                <Typography variant="h3">Update Team Scores</Typography>
                </PortletHeader>
                <PortletContent>
                        <Button 
                        variant="contained"
                        size="medium" 
                        color="primary" 
                        id="updateScoresBtn" 
                        onClick={() => this.handleUpdate(this.props.competitors)}>
                        <Update /> &nbsp;
                        Update Team Scores
                        </Button>
                        <br />
                    <br />
                    <Typography variant="h4" color="textSecondary">Updated Teams Scores Counter: {counter}</Typography>
                        </PortletContent>
                        </Portlet>
                // </div>
        )
    }
}

export default withStyles(styles)(UpdateScores);
