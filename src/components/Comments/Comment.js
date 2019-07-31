import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  // current user's comments
  right: {
    float: "right",
    textAlign: "right",
    clear: "both",
    marginBottom: "1em",
    ...theme.mixins.gutters(),
    backgroundColor: 'rgba(0, 148, 144, .2)',
    maxWidth: 500,

    margin: "0 auto"
  },
  left: {
    float: "left",
    textAlign: "left",
    clear: "both",
    marginBottom: "1em",
    ...theme.mixins.gutters(),

    maxWidth: 500,
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

const Comment = ({ author, content, date, alignement, classes }) => (
  console.log(alignement),
  (
    <div>
      {alignement === "right" ? (
        <Paper className={classes.right}>
          <Typography component="p">
            <div className={classes.author}> {author}</div>
            <div>{content}</div>
            <div className={classes.date}> {date}</div>
          </Typography>
        </Paper>
      ) : (
        <Paper className={classes.left}>
          <Typography component="p">
            <div className={classes.author}> {author}</div>
            <div>{content}</div>
            <div className={classes.date}> {date}</div>
          </Typography>
        </Paper>
      )}
    </div>
  )
);

Comment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comment);
