import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import { TeamSelector } from '../../../selectors/teamSelector';
import { ProfileSelector } from '../../../selectors/profileSelector';
import { Tier1Selector } from '../../../selectors/tier1Selector';
import { Tier2Selector } from '../../../selectors/tier2Selector';
import { CompetitionStatusSelector } from '../../../selectors/competitionStatusSelector';
import classNames from 'classnames';
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
import { Record } from 'immutable';

import { StickyContainer, Sticky } from 'react-sticky';

// Custom components
import AccountProfile from '../../components/profile/AccountProfile';
import Portlet from '../../components/Portlet';
import PortletContent from '../../components/PortletContent';
import PortletHeader from '../../components/Portlet';
import PortletLabel from '../../components/Portlet';
import ProgressBar from '../../components/progressBar/progressBar.js';

// Material helpers
import { withStyles } from '@material-ui/core';

import './team-page.css';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4),
  }, 
  progressBar: {
    position: "-webkit-sticky",
    top: 0
  },
  sticky: {
    background: 'white',
    position: '-webkit-sticky',
    position: 'sticky',
    top: 10,
    bottom: 0,
    paddingTop: '40px',
    paddingBottom: '40px',
    zIndex: 5,
    paddingTop: 0,
    paddingBottom: 0,
  }
});

const stickIt = {
  position: '-webkit-sticky',
  position: 'sticky',
  top: 0,
}


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
      active: true,
      toggle: true,
      spacing: '8',
      eventName: '',
      open: false,
      score: null,
    };
  }


  componentWillMount() {
    this.props.loadProfile();
    this.props.loadCompetitors();
    this.props.loadTeam();
    this.props.loadTeamName();
    this.props.loadCompetition();
    // if (this.props.compStatus === true) {
    //   this.setState({ toggle: false })
    // }
  }

  componentDidUpdate(prevProps) {
    console.log("CDUPROPS::",this.props);
    if (prevProps.competition.size !== this.props.competition.size) {
      this.renderEventName();
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.compStatus !== this.state.toggle) {
      console.log("HANDLETOGGLE::2", nextProps.compStatus);
      this.setState({ toggle: nextProps.compStatus })
    }

    // if (nextProps.competition.size !== this.props.competition.size) {
    //   this.renderEventName();
    // }

  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("HANDLETOGGLE::3", nextProps.compStatus);
  //   console.log("HANDLETOGGLE::4", this.state.toggle);
  //   if(this.state.toggle) {
  //   if (nextProps.compStatus !== this.state.toggle) {
  //     console.log("HANDLETOGGLE::2", nextProps.compStatus);
  //     this.setState({ toggle: nextProps.compStatus })
  //   }
  // }
  // }

  handleToggle = (event) => {
    console.log("HANDLETOGGLE::",event.target.checked);
    this.setState({ toggle: event.target.checked });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (event) => {
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

  renderEventName = () => {
    const { competition } = this.props
    console.log("competion::", competition.list)
    if (competition.size > 0) {
      competition.list.slice(0, 1).forEach(evt => {
        console.log("here::", evt)
        this.setState({ eventName: evt.name })
      })
    }
  }


  // renderDefaultTitle = () => {
  //   return <Typography variant="display2" gutterBottom>
  //     Fantasy Eventer Team
  //     </Typography>
  // }

  renderAddTeam = () => {
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
    console.log("TEAMPROPS::", this.props)
    const { classes, className, profileDetail, compStatus } = this.props;
    const { completeness, toggle } = this.state;
    const rootClassName = classNames(classes.root, className);
    return (
      <div className={rootClassName}>
        {/* <div className="g-row">
          <div className="g-col"> */}
            <AccountProfile {...this.props} />
            <br />
             <Portlet className={classes.sticky} >
              <PortletContent>
                <Team team={this.props.team} profileDetail={profileDetail} {...this.props} />
              </PortletContent>
            </Portlet>
            <br />
            <div>
              {
                toggle ? <FormControlLabel disabled control={<Switch value="true" />} label="Disabled - Teams are locked until event is completed" /> :
                  <Toggle label="Pick or Update Team" handleToggle={this.handleToggle} togglePosition={toggle} />
              }
            </div>
            <div>
              {this.state.toggle ? null : this.renderAddTeam()}
            </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profileDetail: ProfileSelector(state),
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

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(TeamPage));