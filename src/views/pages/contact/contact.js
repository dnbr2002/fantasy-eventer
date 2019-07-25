import React, { Component } from 'react'
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

 class ContactPage extends Component {
    render() {
        const { classes, className } = this.props;
        const rootClassName = classNames(classes.root, className);
        return (
            <div className={rootClassName}>
            <div className="g-row">
                <div className="g-col">
                <div className="bootstrap">
                <div className="jumbotron">
                    <h1 className="display-3">Contact</h1>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default withStyles(styles)(ContactPage);