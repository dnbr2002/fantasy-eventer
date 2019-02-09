/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TeamSelector } from '../../../selectors/teamSelector';
import { ProfileSelector } from '../../../selectors/profileSelector';
import { Tier1Selector } from '../../../selectors/tier1Selector';
import { Tier2Selector } from '../../../selectors/tier2Selector';
import { CompetitionStatusSelector } from '../../../selectors/competitionStatusSelector';
import * as teamActions from '../../../actions/teamActions';
import * as teamNameActions from '../../../actions/teamNameActions';
import * as adminActions from '../../../actions/adminActions';
import * as competitionActions from '../../../actions/competitionActions';
import * as profileActions from '../../../actions/profileActions';
import Tier1Table from '../../components/tables/tier1Table';
import Tier2Table from '../../components/tables/tier2Table';
// import AddTeamName from '../../components/team/addTeamName';
import Team from '../../components/team/team';
import TeamSummary from '../../components/team/teamSummary';
import TeamCard from '../../components/team/teamCard';
import Toggle from '../../components/toggle/toggle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import TeamName from '../../components/team/teamName'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import toastr from 'toastr';
import { Record, List } from 'immutable';

export const TeamRecord = new Record({
  key: null,
  profileName: null,
  profilePic: null,
  teamName: null, 
  score: 0,
  teamKeysTier1: null,
  teamKeysTier2: null
});



class TeamPage extends Component {
  static propTypes = {
    loadCompetitors: PropTypes.func.isRequired,
    loadCompetition: PropTypes.func.isRequired,
    loadTeam: PropTypes.func.isRequired,
    loadTeamName: PropTypes.func.isRequired,
    loadProfile: PropTypes.func.isRequired, 
    updateProfile: PropTypes.func.isRequired,  
    updateTeamName: PropTypes.func.isRequired,
    updateTeam: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      // active: true,
      toggle: true,
      spacing: '8',
      eventName: '',
      open: false,
      score: null
    };
    this.handleToggle = this.handleToggle.bind(this)
    this.renderTeamName = this.renderTeamName.bind(this)
    this.renderDefaultTitle = this.renderDefaultTitle.bind(this)
    this.renderTotalScore = this.renderTotalScore.bind(this)
    this.renderAddTeamName = this.renderAddTeamName.bind(this)
    this.renderEventName = this.renderEventName.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  componentWillMount() {
    this.props.loadProfile();
    this.props.loadCompetitors();
    this.props.loadTeam();
    this.props.loadTeamName();
    this.props.loadCompetition();
    // this.renderTotalScore();
    if(this.props.compStatus === true) {
      this.setState({toggle: false})
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.competition.size !== this.props.competition.size) {
      this.renderEventName();
    }

    if (prevProps.compStatus !== this.props.compStatus) {
      this.setState({toggle: JSON.parse(this.props.compStatus)})
    }

    if (prevProps.team !== this.props.team) {
      this.renderTotalScore();
    }
  }

  handleToggle(event) {
    this.setState({ toggle: event.target.checked });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ open: false });
    // debugger;
    const name = event.target.elements.name.value
    const key = event.target.elements.name.id
    const teamName = {
      name: name,
      key: key
    }
    this.props.updateTeamName(teamName.key, teamName.name);
  }


  renderTeamName() {
    return (
      <div>

      </div>
    )
  }

  renderEventName() {
    const { competition } = this.props
    console.log("competion::", competition.list)
    if (competition.size > 0) {
      competition.list.slice(0, 1).forEach(evt => {
        console.log("here::", evt)
        this.setState({ eventName: evt.name })
      })
    }
  }

  renderTotalScore() {
    // console.log("THISTEAMPROPS:::",this.props.team)
    var sum = this.props.team.reduce((accum, total) => {
      return accum + Number(total.score)
    }, 0);

    this.setState({score: sum});
  }

  renderDefaultTitle() {
    return <Typography variant="display2" gutterBottom>
      Fantasy Eventer Team
      </Typography>
  }

  renderAddTeamName() {
    toastr.info("WAIT!!! You need a Team Name. Sending you to your profile to set that up now.");
    this.props.history.push('/profile');
  }


  renderAddTeam() {
    return (
      <div>
        <div>
          <Tier1Table numComps={2} eventName={this.state.eventName} {...this.props} />
        </div>
        <div>
           <Tier2Table numComps={5} eventName={this.state.eventName} {...this.props} />
        </div>
      </div>
    )
  }

  render() {
    console.log("TEAMPROPS::",this.props)
    return (
      <div className="g-row">
        <div className="g-col">
          <Grid container justify="center">
            <TeamSummary />
          </Grid>
          <br />
          <br />
          <Grid container justify="center">
            <TeamCard {...this.props} score={this.state.score} renderAddTeamName={this.renderAddTeamName} />              
            </Grid>
          <br />            
            <Team team={this.props.team} />
          <br />
          <div>
            {
              this.props.compStatus === "true" ? <FormControlLabel disabled control={<Switch value="true" />} label="Disabled - Teams are locked until event is completed" /> :
               <Toggle label="Pick or Update Team" handleToggle={this.handleToggle} togglePosition={this.state.toggle} />        
            }
          </div>
          <div>
            {this.state.toggle ? null : this.renderAddTeam()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: ProfileSelector(state),
    profile: (state.profile),
    tier1: Tier1Selector(state),
    tier2: Tier2Selector(state),
    team: TeamSelector(state),
    teamKeys: state.team.list,
    teamName: state.teamName,
    competition: state.competition,
    competitors: state.competitors,
    compStatus: CompetitionStatusSelector(state)
  }
}


const mapDispatchToProps = Object.assign(
  {},
  teamActions,
  teamNameActions,
  adminActions,
  competitionActions,
  profileActions
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamPage));