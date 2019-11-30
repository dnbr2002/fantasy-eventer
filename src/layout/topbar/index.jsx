import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core';

// Material icons
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    Input as InputIcon
} from '@material-ui/icons';

// Component styles
import styles from './styles';

class Topbar extends Component {
    signal = true;

    componentDidMount() {
        this.signal = true;
    }

    componentWillUnmount() {
        this.signal = false;
    }

    handleSignOut = () => {
        const { history } = this.props;

        localStorage.setItem('isAuthenticated', false);
        history.push('/signin');
    };

    render() {
        const {
            classes,
            className,
            title,
            isSidebarOpen,
            onToggleSidebar,
            signOut,
            authenticated
        } = this.props;

        const rootClassName = classNames(classes.root, className);

        return (
            <div>
                {authenticated ?
                    <Fragment>
                        <div className={rootClassName}>
                            <Toolbar className={classes.toolbar}>
                                <IconButton
                                    className={classes.menuButton}
                                    onClick={onToggleSidebar}
                                    variant="text"
                                >
                                    {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                                </IconButton>
                                <Typography
                                    className={classes.title}
                                    variant="h4"
                                    color="textSecondary"
                                >
                                    {title}
                                </Typography>
                                <IconButton
                                    className={classes.signOutButton}
                                    onClick={signOut}
                                >
                                    <InputIcon />
                                </IconButton>
                            </Toolbar>
                        </div>
                    </Fragment> : null}
            </div>
        );
    }
}

Topbar.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    isSidebarOpen: PropTypes.bool,
    onToggleSidebar: PropTypes.func,
    title: PropTypes.string
};

Topbar.defaultProps = {
    onToggleSidebar: () => { }
};

export default compose(
    withRouter,
    withStyles(styles)
)(Topbar);
