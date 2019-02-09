import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
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
        console.log("DELETE::");
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
                        style={{color: '#ffffff'}} 
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
