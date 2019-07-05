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

// Component styles
const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 4
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
        return (
            <div>
                <div className="g-row">
                    <div className="g-col">
                        <AccountProfile {...this.props} />

                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
