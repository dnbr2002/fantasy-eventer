import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Divider, Typography } from '@material-ui/core';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  company: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5)
  }
});

class Footer extends Component {
  render() {
    const { classes, className, authenticated } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div>
        {authenticated ?
      <div className={rootClassName}>
        
        <Divider />
        <Typography
          className={classes.company}
          variant="body1"
        >
          &copy; Fantasy Eventer. 2019
        </Typography>
        <Typography variant="caption">
          Created with love for all fans of Eventing.  By the geeky husband of a pretty serious eventer!
        </Typography> 
      </div> : null}
      </div>
    );
  }
}

Footer.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
