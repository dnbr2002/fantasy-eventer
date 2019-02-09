import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import PeopleOutline from '@material-ui/icons/PeopleOutline';


class RemoveTeam extends Component {
    static propTypes = {
        bulkRemoveTeams: PropTypes.func.isRequired
    };

    constructor() {
        super()
        this.handleRemove = this.handleRemove.bind(this)
    }

    handleRemove() {
        console.log("DELETE::");
            this.props.bulkRemoveTeams()
    }

    render() {
        return (
                <div className="form">
                        <Button 
                        variant="raised" 
                        size="medium" 
                        color="secondary" 
                        style={{color: '#ffffff'}} 
                        id="removeCompetitorBtn" 
                        onClick={this.handleRemove}>
                        <PeopleOutline />
                        &nbsp; Remove all teams
                        </Button>
                </div>
        )
    }
}

export default RemoveTeam
