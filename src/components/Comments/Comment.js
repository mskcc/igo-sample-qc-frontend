import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  // current user's comments
  right: {
    float: "right",
    textAlign: "right",
    clear: "both",
    marginBottom: "1em",
    ...theme.mixins.gutters(),
    backgroundColor: "rgba(0, 148, 144, .2)",
    maxWidth: "70%",
    minWidth: "30%",

    margin: "0 auto"
  },
  left: {
    float: "left",
    textAlign: "left",
    clear: "both",
    marginBottom: "1em",
    ...theme.mixins.gutters(),
    maxWidth: "70%",
    minWidth: "30%",
    margin: "0 auto"
  },
  author: {
    fontSize: ".8em",
    textAlign: "left"
  },
  date: {
    fontSize: ".8em",
    textAlign: "right"
  }
});

const Comment = ({ id, author, comment, date, alignment, classes }) => (
  <div id={id}>
    <Paper className={classes[alignment]}>
      <div className={classes.author}> {author}</div>
      <div>{comment}</div>
      <div className={classes.date}> {date}</div>
    </Paper>
  </div>
);

Comment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comment);
