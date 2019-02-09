import React, { Component } from 'react'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from 'material-ui/Button';


class RemoveCompetitor extends Component {
    static propTypes = {
        removeCompetitor: PropTypes.func.isRequired
    };

    constructor() {
        super()
        this.handleRemove = this.handleRemove.bind(this)
    }

    handleRemove() {
        console.log("DELETE::");
            this.props.removeCompetitor()
    }

    render() {
        return (
                <div className="form">
                        <Button variant="raised" size="small" color="secondary" style={{color: '#ffffff'}} id="removeCompetitorBtn" onClick={this.handleRemove}>Remove</Button>
                </div>
        )
    }
}

export default RemoveCompetitor

