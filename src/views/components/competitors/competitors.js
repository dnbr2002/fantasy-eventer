import React from 'react'
import PropTypes from 'prop-types'
import Competitor from './competitor'
import { List } from 'immutable';

function Competitors({ competitors, removeCompetitor }) {

    let competitorItems = competitors.map((competitor, index) => {
        // console.log("COMPETITORSIMAGE::",competitor.imageLink);
        // console.log("COMPETITORSDESC::",competitor.description);
        // console.log("COMPETITORSIDX::",index);
        return (
            <Competitor
                key={index}
                competitor={competitor}
                removeCompetitor={removeCompetitor}
            />
        );
    });

    return (
        <div className="photoGrid">
            {competitorItems}
        </div>
    );
}

Competitors.propTypes = {
    competitors: PropTypes.instanceOf(List).isRequired,
    removeCompetitor: PropTypes.func.isRequired,
}
export default Competitors
