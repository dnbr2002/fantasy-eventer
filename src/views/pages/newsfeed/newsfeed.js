import React, { Component } from 'react'
import classNames from 'classnames';
// Material UI
import {
    withStyles,
    Typography,
  } from '@material-ui/core';
import RSSParser from 'rss-parser';

//Custom Components
import NewsLinks from '../../components/newsfeed/newsLink.js';
// Component styles
const styles = theme => ({
    root: {
        padding: theme.spacing(4)
    },
    newsHeader: {
        backgroundColor: theme.palette.primary.main
    },
    jumboTitle: {
        paddingLeft: 24  
    }
});


const newsObj = {
    copyright: "2019 Google Inc.",
    description: "Google News",
    generator: "NFE/5.0",
    items: [],
    language: "en-US",
    lastBuildDate: "Fri, 26 Jul 2019 03:10:30 GMT",
    link: "https://news.google.com/search?q=fair%20hill%20international%20internation%20horse%20trials&hl=en-US&gl=US&ceid=US%3Aen",
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
                item: ['media:content', 'content'],
            }
        })
        parser.parseURL(CORS_PROXY + 'https://news.google.com/rss/search?q=fair+hill+international+horse+trials+5+star', (err, feed) => {
            console.log(feed.title);
            console.log("FEED::", feed);
            this.setState({ news: feed })
            // this.setState({ toggle: false })
        })
    }

    xml2Json = () => {

    }

    render() {
        const { classes, className } = this.props;
        const rootClassName = classNames(classes.root, className);
        const jumboStyles = {
            backgroundColor: '#0767DB',
            color: 'white',
        };
        return (
            <div className={rootClassName}>
                <div className="g-row">
                    <div className="g-col">
                        <div className="bootstrap">
                            <div className="jumbotron" style={jumboStyles}>
                                    <Typography
                                        gutterBottom
                                        variant="h1"
                                        className={classes.jumboTitle}
                                    >
                                        Event News Feed
                                    </Typography>
                            </div>
                            <NewsLinks news={this.state.news} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(NewsFeedPage);