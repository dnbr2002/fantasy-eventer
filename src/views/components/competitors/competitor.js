import React from 'react';
import PropTypes from 'prop-types';
  

function Competitor({competitor,removeCompetitor}) {

    return (
        <figure className="figure">
            <img className="photo" src={competitor.imageLink} alt={competitor.description} />
            <figcation> <p> {competitor.description} </p> </figcation>
            <div className="button-container">
                <button onClick={() => {
                    removeCompetitor(competitor)
                }}> Remove </button>
            </div>
        </figure>
    )
}

Competitor.propTypes = {
    competitor: PropTypes.object.isRequired,
    removeCompetitor: PropTypes.func.isRequired,
}


export default Competitor;
