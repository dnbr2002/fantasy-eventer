import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button, TextField } from '@material-ui/core';

// Shared components
import Portlet from '../../components/Portlet';
import PortletHeader from '../../components/PortletHeader';
import PortletLabel from '../../components/PortletLabel';
import PortletContent from '../../components/PortletContent';
import PortletFooter from '../../components/PortletFooter';

//Countries
import { Countries } from '../countries/countryName'

const styles = theme => ({
  root: {},
  field: {
    margin: theme.spacing.unit * 3
  },
  textField: {
    width: '420px',
    maxWidth: '100%',
    marginRight: theme.spacing.unit * 3
  },
  portletFooter: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});


class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      team: '',
      pic: '',
      email: '',
      country: ''
    };
  }

componentWillReceiveProps(nextProps) {
  if(nextProps.profile != this.props.profile) {
    this.setState({
      name: nextProps.profile.profileName,
      team: nextProps.profile.teamName,
      pic: nextProps.profile.profilePic,
      email: nextProps.profile.email,
      country: nextProps.profile.country
    })
  }
}

  handleChange = e => {
    e.persist()
    console.log("here::", e)
    this.setState({
      state: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const profileName = event.target.elements.name.value;
    const teamName = event.target.elements.teamName.value;
    const profilePic = event.target.elements.pic.value;
    const email = event.target.elements.email.value;
    const country = event.target.elements.country.value;

    const profileData = {
      profileName: profileName,
      teamName: teamName,
      profilePic: profilePic,
      email: email,
      country: country
    }

    if (!this.props.profile) {
      this.props.createProfile(profileData);
    }
    else {
      this.props.updateProfile(this.props.profile.key, profileData)
    }
  }

  render() {
    const { classes, className, ...rest } = this.props;
    const { name, team, pic, email, country } = this.state;

    const rootClassName = classNames(classes.root, className);
    console.log("PROFILEFORMPROPS::", this.props);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <form
          autoComplete="off"
          noValidate
          onSubmit={this.handleSubmit}
        >
          <PortletHeader>

            <PortletLabel
              subtitle="The information can be edited"
              title="Profile"
            />
          </PortletHeader>
          <PortletContent noPadding>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                helperText="Please specify your name"
                label="Name"
                id="name"
                margin="dense"
                onChange={this.handleChange}
                required
                // value={name}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                helperText="Please specify your team name"
                label="Team Name"
                id="teamName"
                margin="dense"
                required
                onChange={this.handleChange}
                // value={team}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                helperText="Please specify image link for your team. Example: 'http://www.pichost.com/mypic.jpg'"
                label="Picture"
                id="pic"
                margin="dense"
                onChange={this.handleChange}
                required
                // value={pic}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Email Address"
                id="email"
                type="email"
                name="email"
                margin="dense"
                onChange={this.handleChange}
                required
                // value={email}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Select Country"
                id="country"
                margin="dense"
                onChange={this.handleChange}
                required
                select
                SelectProps={{ native: true }}
                // value={country}
                variant="outlined">
                {Countries.map((option, index) => (
                  <option
                    key={index}
                    value={option.abbreviation}
                    selected={option.country}
                  >
                    {option.country}
                  </option>
                ))}
              </TextField>
            </div>

          </PortletContent>
          <PortletFooter className={classes.portletFooter}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
            >
              Update Details
          </Button>
          </PortletFooter>
        </form>
      </Portlet>

    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);