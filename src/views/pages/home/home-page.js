import React, { Component } from 'react'
import classNames from 'classnames';
// Material helpers
import { withStyles } from '@material-ui/core';
//import PropTypes from 'prop-types'

//custome components
import Parallax from "../../components/parallax/parallax";
import GridContainer from "../../components/grid/gridContainer.js";
import GridItem from "../../components/grid/gridItem.js";
import HomeSections from "../../components/home/homeSections";

// @material-ui/core components

// Component styles
import styles from "./styles";
// const styles = theme => ({
//     root: {
//         padding: theme.spacing(4)
//     }
// });


class HomePage extends Component {
    render() {
        const { className, classes } = this.props;
        // const classes = useStyles();
         const rootClassName = classNames(classes.root, className);
        
        return (
            <div>
                <Parallax filter image={require("../../../assets/images/landing-bg.jpg")}>
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <h1 className={classes.title}>Welcome Fantasy Eventers</h1>
                                <h4>
                                    Test your skills at the biggests events in the world. Pick a team of 
                                    eventers.  Just like the sport itself, lowest score wins!  
                                 </h4>
                                <br />
                                {/* <Button
                                    color="danger"
                                    size="lg"
                                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fas fa-play" />
                                    Watch video
                            </Button> */}
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>
                <div className={classes.container}>
                    <HomeSections />
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(HomePage);
