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

// Material components
import { Grid } from '@material-ui/core';


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
                          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={4}
              md={6}
              xl={4}
              xs={12}
            >
                <AccountProfile {...this.props} />
            </Grid>

            <Grid
              item
              lg={8}
              md={6}
              xl={8}
              xs={12}
            >
              <AccountDetails {...this.props} />
            </Grid>
          </Grid>                        

                {/* <div className="g-row">
                    <div className="g-col">
                        <ProfileCard {...this.props}
                        />
                    </div>
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profileDetail: ProfileSelector(state)
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
