import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Comment from "./Comment";

const styles = theme => ({
  container: {
    textAlign: "center",
    gridArea: "commentBox",
    width: "100%",
    height: "100%",
    overflowX: "auto"
  }
});

const CommentBox = ({ comments, classes }) => (
  <div className={classes.container}>
    {comments.map(comment => (
      <Comment
        author={comment.author}
        content={comment.content}
        date={comment.date}
        alignement={"username" === comment.author ? "right" : "left"}
      />
    ))}
  </div>
);

CommentBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentBox);
