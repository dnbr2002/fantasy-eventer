import React, { Component } from 'react'
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
// Material helpers
import { withStyles } from '@material-ui/core';
//import PropTypes from 'prop-types'

//Redux Actions
import * as competitionActions from '../../../actions/competitionActions';
import Competition from '../../components/competition/competition';

// Component styles
const styles = theme => ({
    root: {
      padding: theme.spacing(4)
    }
  });

 class SchedulePage extends Component {

    componentWillMount() {
        this.props.loadCompetition();
      }
    
    render() {
        const { classes, className } = this.props;
        const rootClassName = classNames(classes.root, className);
        console.log("COMPETITON::",this.props);
        return (
            <div className={rootClassName}>
            {/* <div className="g-row">
                <div className="g-col">
                <div className="bootstrap">
                <div className="jumbotron">
                    <h1 className="display-3">Schedule</h1>
                    </div>
                    </div>
                </div>
            </div> */}
            <Competition {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      competition: state.competition,
    }
  }

const mapDispatchToProps = Object.assign(
    {},
    competitionActions,
  );

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(SchedulePage));

