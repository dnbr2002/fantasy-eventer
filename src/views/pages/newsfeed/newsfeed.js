import React, { Component } from 'react'
import classNames from 'classnames';
// Material helpers
import { withStyles } from '@material-ui/core';
import RSSParser from 'rss-parser';
//import PropTypes from 'prop-types'

//Custom Components
import NewsLinks from '../../components/newsfeed/newsLink.js';
// Component styles
const styles = theme => ({
    root: {
      padding: theme.spacing(4)
    }
  });

  const newsObj = {
    copyright: "2019 Google Inc.",
    description: "Google News",
    generator: "NFE/5.0",
    items: [],
    language: "en-US",
    lastBuildDate: "Fri, 26 Jul 2019 03:10:30 GMT",
    link: "https://news.google.com/search?q=fair+hill+international+horse+trials+5+star&hl=en-US&gl=US&ceid=US:en",
    title: "fair hill international horse trials 5 star - Google News",
    webMaster: "news-webmaster@google.com"
  }

  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

 class NewsFeedPage extends Component {
    constructor() {
        super()
        this.state = {
            news: newsObj
        };
      }
componentWillMount() {
    let parser = new RSSParser({
        customFields: {
            item: ['media:content','content'],
          }
    })
    parser.parseURL(CORS_PROXY + 'https://news.google.com/rss/search?q=fair+hill+international+horse+trials+5+star', (err, feed) => {
      console.log(feed.title);
      console.log("FEED::",feed);
      this.setState({ news: feed })
        // this.setState({ toggle: false })
    })
}

xml2Json = () => {

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
                    <h1 className="display-3">Latest News</h1>
                    <NewsLinks news={this.state.news} />
                    </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default withStyles(styles)(NewsFeedPage);