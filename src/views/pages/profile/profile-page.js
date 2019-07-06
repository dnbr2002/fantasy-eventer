/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as profileActions from '../../../actions/profileActions';
import ProfileCard from '../../components/profile/profileCard';
import { ProfileSelector } from '../../../selectors/profileSelector';
// Custom components
import AccountProfile from '../../components/profile/AccountProfile';
import AccountDetails from '../../components/profile/AccountDetails';
import compose from 'recompose/compose';

import classNames from 'classnames';
// Material helpers
import { withStyles } from '@material-ui/core';
//import PropTypes from 'prop-types'

// Component styles
const styles = theme => ({
    root: {
      padding: theme.spacing(4)
    }
  });


class ProfilePage extends Component {
    static propTypes = {
        createProfile: PropTypes.func.isRequired,
        loadProfile: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.props.loadProfile();
    }

    render() {
        console.log("PROFILEPROPS::", this.props)
        const { classes, className } = this.props;
        const rootClassName = classNames(classes.root, className);
        return (
            <div className={rootClassName}>
                {/* <div className="g-row">
                    <div className="g-col">
                        <AccountProfile {...this.props} />

                    </div>
                </div> */}
                <div className="g-row">
                    <div className="g-col">
                        <ProfileCard {...this.props}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: ProfileSelector(state)
    }
}

const mapDispatchToProps = Object.assign(
    {},
    profileActions
);

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
    )(withRouter(ProfilePage));
