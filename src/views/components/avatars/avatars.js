import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'left',
    },
    avatar: {
        margin: 2,
    },
    bigAvatar: {
        width: 80,
        height: 80,
    },
};

function ImageAvatars(props) {
    const { classes } = props;
    if (props.bigAvatar) {
        return (
            <div className={classes.row}>
                <Avatar
                    alt={props.alt}
                    src={props.src}
                    className={classNames(classes.avatar, classes.bigAvatar)}
                />
            </div>
        );
    }
    else {
        return (
            <div className={classes.row}>
                <Avatar alt={props.alt} src={props.src} className={classes.avatar} />
            </div>
        );
    }

}

ImageAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    bigAvatar: PropTypes.string
};

export default withStyles(styles)(ImageAvatars);