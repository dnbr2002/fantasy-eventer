    
import React from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Paper } from '@material-ui/core';

// Component styles
const styles = theme => {
  return {
    root: {
      borderRadius: '4px'
    },
    squared: {
      borderRadius: 0
    },
    outlined: {
      border: `1px solid ${theme.palette.border}`
    }
  };
};

const CustomPaper = props => {
  const { 
    classes, 
    className, 
    outlined, 
    squared, 
    children, 
    Profile, 
    createProfile, 
    createProfileFromSignUp,
    createProfileFromSocialLogin,
    createProfileSuccess,
    createProfileError,
    loadProfile,
    loadProfileSuccess,
    loadProfileError,
    updateProfile,
    updateProfileSuccess,
    updateProfileError,
    removeCompetitionError,
    updateCompetitionSuccess,
    removeCompetitionSuccess,
    removeCompetition,
    updateCompetitionError,
    updateCompetition,
    createCompetitionError,
    createCompetitionSuccess,
    createCompetition,
    loadCompetitionError,
    loadCompetitionSuccess,
    loadCompetition,
    CompInfo,
    bulkUpdateScores,
    bulkRemoveTeams,
    bulkRemoveCompetitor,
    removeCompetitorError,
    removeCompetitorSuccess,
    removeCompetitor,
    filterCompetitors,
    updateCompetitorError,
    updateCompetitorSuccess,
    updateCompetitor,
    createCompetitorError,
    createCompetitorSuccess,
    createCompetitor,
    loadCompetitorsError,
    loadCompetitorsSuccess,
    loadCompetitors,
    Competitor,
    updateTeamNameError,
    updateTeamNameSuccess,
    updateTeamName,
    createTeamNameError,
    createTeamNameSuccess,
    createTeamName,
    loadTeamNameError,
    loadTeamNameSuccess,
    loadTeamName,
    TeamName,
    removeTeammateError,
    removeTeammateSuccess,
    removeTeammate,
    filterTeam,
    updateTeammateError,
    updateTeammateSuccess,
    updateTeam,
    loadTeamError,
    loadTeamSuccess,
    loadTeamLeague,
    loadTeam, 
    pickTeam,
    Team,
    compStatus,
    teamName,
    teamKeys,
     ...rest } = props;

  const rootClassName = classNames(
    {
      [classes.root]: true,
      [classes.squared]: squared,
      [classes.outlined]: outlined
    },
    className
  );

  return (
    <Paper
      {...rest}
      className={rootClassName}
    >
      {children}
    </Paper>
  );
};

CustomPaper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  elevation: PropTypes.number,
  outlined: PropTypes.bool,
  squared: PropTypes.bool
};

CustomPaper.defaultProps = {
  squared: false,
  outlined: true,
  elevation: 0
};

export default withStyles(styles)(CustomPaper);