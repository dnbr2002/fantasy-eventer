import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    Divider,
    Grid,
    Paper,
    Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Portlet from '../../components/Portlet';
import PortletContent from '../../components/PortletContent';
import PortletHeader from '../../components/PortletHeader';
import PortletFooter from '../../components/PortletFooter';
import PortletLabel from '../../components/PortletLabel';

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
        }, [items])

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
                console.log("MC2::", item),
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
                                        <a href={item.value.link} target="_blank">  {item.value.title} </a>
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
                                      {  item.mediaContent !== "no media content" ? <img src={item.mediaContent.url} width={item.mediaContent.width} height={item.mediaContent.height} alt={item.value.title + " image"} />
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