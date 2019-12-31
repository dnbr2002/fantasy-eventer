import React, { Component } from 'react'

// Material helpers
import { 
    withStyles,
    // Typography 
} from '@material-ui/core';
//import PropTypes from 'prop-types'

//custome components
import Parallax from "../../components/parallax/parallax";
import GridContainer from "../../components/grid/gridContainer.js";
import GridItem from "../../components/grid/gridItem.js";
import HomeSections from "../../components/home/homeSections";

// @material-ui/core components

// Component styles
import styles from "./styles";


class HomePage extends Component {
    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.page}>
                <Parallax filter image={require("../../../assets/images/landing-bg2.png")}>
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                {/* <Typography className={classes.title} variant="h1">
                                Welcome Fantasy Eventers
                                </Typography> */}
                                {/* <h1 className={classes.title}>Welcome Fantasy Eventers</h1> */}
                                {/* <Typography className={classes.subtitle}  variant="h2">
                                    Test your skills at the biggests events in the world. Pick a team of 
                                    eventers.  Lowest score wins!  
                                 </Typography> */}
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
