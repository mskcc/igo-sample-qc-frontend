import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  container: {
    width: "80vw",
    height: "80vh",
    margin: "5% auto",
    // position: "relative"
  },
  iframe:{
    width: "100%",
    height: "100%",
  }
  //   ...theme.mixins.gutters(),
  //   paddingTop: theme.spacing(2),
  //   paddingBottom: theme.spacing(2),
  //   maxWidth: 500,
  //   margin: "0 auto"
  // }
});

const Instructions = ({ type, msg, classes }) => (
  <div>
    <div className={classes.container}>
      <iframe
      className={classes.iframe}
        allowfullscreen
        frameborder="0"
        src="https://www.lucidchart.com/documents/embeddedchart/f1fcc586-50bc-4239-8ca8-96cd54833ffa"
        id="MERilBZKM5U~"
      />
    </div>
  </div>
);

Instructions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Instructions);
