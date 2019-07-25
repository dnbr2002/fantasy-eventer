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

 class NewsFeedPage extends Component {
    constructor() {
        super()
        this.state = {
            news: ''
        };
      }
componentWillMount() {
    fetch('/https://news.google.com/rss/search?q=cats')
  .then(function(response) {
      console.log("response", response)
      this.setState({news: response})
    return response.json()
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
}

    render() {
        const { classes, className } = this.props;
        const rootClassName = classNames(classes.root, className);
        return (
            <div className={rootClassName}>
            <div className="g-row">
                <div className="g-col">
                <div className="bootstrap">
                <div className="jumbotron">
                    <h1 className="display-3">NewsFeed: {this.state.news}</h1>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default withStyles(styles)(NewsFeedPage);