import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Divider,
    Grid,
    Paper,
    Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PortletHeader from '../../components/PortletHeader';
import PortletLabel from '../../components/PortletLabel';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        margin: theme.spacing(3)
    },
    image: {
        height: 100,
        width: 100,
    },
    paperDivider: {
        width: '100%'
    }
});


function NewsLink(props) {
    console.log("newsLink::", props);
     const { items } = props.news
    const [newsItems, setNewsItems] = useState(items);

useEffect(
    () => {
        console.log("LENGTH::", items.length);
        if (items.length > 1) {
            console.log("NEWITEMS1",props.news.items)
            setNewsItems(props.news.items)
        }
    }, [items])

    return (
        console.log("NEWITEMS2",newsItems),
        <div>
            {newsItems.map((item, index) => {
                console.log("NEWlINK::", item.$.url)

            })}
        </div>
    );

}


export default withStyles(styles)(NewsLink);