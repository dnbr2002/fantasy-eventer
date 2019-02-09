import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    //maxWidth: 1000
  },
  media: {
    height: 0,
    // paddingTop: "56.25%" // 16:9
  }
};

function TeamSummary(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        {/* <CardMedia
          className={classes.media}
          title="Contemplative Reptile"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Stable Area
          </Typography>
          <Typography component="p">
            This is your barn. Pick your teams wisely. Keep checking back before
            the event to make sure your team hasn't had any last minute
            scratches. We will close approx 1 hour before the first ride at the
            event.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

TeamSummary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamSummary);
