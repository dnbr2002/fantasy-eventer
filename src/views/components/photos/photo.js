import React from 'react'
import PropTypes from 'prop-types'

function Photo(props) {
    const post = props.post
    return (
        <figure className="figure">
            <img className="photo" src={post.imageLink} alt={post.description} />
            <figcation> <p> {post.description} </p> </figcation>
            <div className="button-container">
                <button onClick={() => {
                    props.actions.removeCompetitor(props.index)
                }}> Remove </button>
            </div>
        </figure>
    )
}

Photo.propTypes = {
    post: PropTypes.object.isRequired
}


export default Photo
