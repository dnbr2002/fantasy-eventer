import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Update from '@material-ui/icons/Update';



class UpdateScores extends Component {
    static propTypes = {
        bulkUpdateScores: PropTypes.func.isRequired
    };

    constructor() {
        super()
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate(competitors) {
            this.props.bulkUpdateScores(competitors)
    }

    render() {
        console.log("UPDATESCORES::",this.props)
        return (
                <div className="form">
                        <Button 
                        variant="raised" 
                        size="medium" 
                        color="primary" 
                        id="updateScoresBtn" 
                        onClick={() => this.handleUpdate(this.props.competitors)}>
                        <Update /> &nbsp;
                        Update Team Scores
                        </Button>
                </div>
        )
    }
}

export default UpdateScores
