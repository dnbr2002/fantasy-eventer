import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const Toggle = ({ label, handleToggle, togglePosition }) => {
    const value = JSON.stringify(togglePosition)
    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Switch
                        checked={togglePosition}
                        onChange={handleToggle}
                        value={value}
                    />
                }
                label={label}
            />
        </FormGroup>
    )
}

Toggle.propTypes = {
    label: PropTypes.string.isRequired,
    handleToggle: PropTypes.func.isRequired,
    togglePosition: PropTypes.bool.isRequired
};

export default Toggle;