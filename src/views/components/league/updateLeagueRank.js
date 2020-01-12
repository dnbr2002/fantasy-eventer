import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import PeopleOutline from '@material-ui/icons/PeopleOutline';


class UpdateLeagueRanks extends Component {
    static propTypes = {
        bulkRemoveTeams: PropTypes.func.isRequired
    };

    componentDidMount() {

    }

    constructor() {
        super()
        this.handleRemove = this.updateRanks.bind(this)
    }

    updateRanks() {
        console.log("DELETE::");
            this.props.bulkRemoveTeams()
    }

    render() {
        return (
                <div className="form">
                        <Button 
                        variant="raised" 
                        size="medium" 
                        color="primary" 
                        id="updateLeagueRankBtn" 
                        onClick={this.updateRanks}>
                        <PeopleOutline />
                        &nbsp; Upate League Ranks
                        </Button>
                </div>
        )
    }
}

export default UpdateLeagueRanks