/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as profileActions from '../../../actions/profileActions';
import ProfileCard from '../../components/profile/profileCard';
import { ProfileSelector } from '../../../selectors/profileSelector';

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
        return (
            <div className="g-row">
                <div className="g-col">
                    <ProfileCard {...this.props} 
                    />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
