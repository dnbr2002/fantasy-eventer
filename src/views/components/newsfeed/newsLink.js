import React, { useState, useEffect, Fragment } from 'react';
import {
    Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Portlet from '../../components/Portlet';
import PortletContent from '../../components/PortletContent';

const styles = theme => ({
    root: {},
    details: {
        display: 'flex',
        float: 'right'
    },
    info: {},
    locationText: {
        marginTop: theme.spacing(1),
        color: theme.palette.text.secondary
    },
    newsText: {
        color: theme.palette.text.secondary,
        float: 'left',
        textAlign: 'left',
    },
    image: {
        float: 'right'
    },
    progressWrapper: {
        marginTop: theme.spacing(2)
    },
    uploadButton: {
        marginRight: theme.spacing(2)
    },
    linearProgress: {
        height: 10
    },
    name: {
        marginLeft: 'auto',
        // marginRight: -1,
    },
    loader: {
        paddingTop: '48px',
        paddingBottom: '24px',
        display: 'flex',
        justifyContent: 'center'
    }
});

function NewsLink(props) {
    console.log("newsLink::", props);
    const { items } = props.news
    const { classes, className, ...rest } = props
    const [newsItems, setNewsItems] = useState(items);

    useEffect(
        () => {
            console.log("LENGTH::", items.length);
            if (items.length > 1) {
                console.log("NEWITEMS1", props.news.items)
                setNewsItems(props.news.items)
            }
        }, [props.news, items.length])

    function parsecontentSnippet(value) {
         var newString = value.replace("&nbsp;", " ");
         var newNewString = newString.replace("&nbsp;", " ");
         return newNewString
        // console.log("NEWSTRING::", newString);
    }
    function getMediaContent(value) {
        return "media:content" in value ? value["media:content"].$ : "no media content";
    }

    function getContentSnippet(value) {
        return "contentSnippet" in value ? parsecontentSnippet(value.contentSnippet) : "no content";
    }

    function getNewsLinks() {
        return newsItems.map(value => ({
            value,
            mediaContent: getMediaContent(value),
            contentSnippet: getContentSnippet(value)
        })
        )
    }

    // const rootClassName = classNames(classes.root, className);

    return (
        <div>
            {getNewsLinks().map((item, index) => (
                <Fragment>
                    <Portlet
                        {...rest}
                    // className={rootClassName}
                    >
                        <PortletContent>
                            <div className={classes.details}>
                                <div className={classes.info}>
                                    <Typography
                                        className={classes.newsText}
                                        variant="h3"
                                    >
                                        <a href={item.value.link} target="_blank" rel="noopener noreferrer">  {item.value.title} </a>
                                    </Typography>

                                    <Typography
                                        className={classes.newsText}
                                        variant="h4"
                                        color="secondaryText"
                                    >
                                        {item.contentSnippet}
                                    </Typography>
                                </div>
                                <div className={classes.image}>
                                      {  item.value.content !== "no media content" ? <img src={item.value.content} alt={item.value.title + " image"} />
                                    : null  
                                    }
                                    </div>
                            </div>
                        </PortletContent>
                    </Portlet>
                    <br />
                    <br />
                </Fragment>

            ))}
        </div>

    );
}

export default withStyles(styles)(NewsLink);