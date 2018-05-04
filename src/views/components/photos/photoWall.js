import React from 'react'
import PropTypes from 'prop-types'
import Photo from './photo'
import {Link} from 'react-router-dom'

import './photoWall.css'

function PhotoWall(props) {
    console.log("PHOTOWALLSTATE::", props.posts)
return (
    <div>
        <div className="photoGrid" >
        {props.posts
        .sort(function(x,y) {
            return y.id -x.id
        })
        .map((post,index) => <Photo key={index} post={post} {...props} index={index}/>)}
        
    </div>
</div>
)
}

PhotoWall.propTypes = {
    posts: PropTypes.array.isRequired,
}
export default PhotoWall
