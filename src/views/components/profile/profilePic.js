import React from 'react'
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

function ProfilePic({url,height,width}) {
    if (!url) {
        return null;
    }
    return (
        <Paper style={{maxWidth: width}}>
            <img
                src={url}
                height={height}
                width={width}
                alt="Profile Pic"
            />
        </Paper>
    )
}

ProfilePic.propTypes = {
    url: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
  };

export default (ProfilePic);
