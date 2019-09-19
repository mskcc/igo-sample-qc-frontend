import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CommentBox from "./CommentBox";
import CommentTextField from "./CommentTextField";

const styles = theme => ({
  container: {
    textAlign: "center",
    gridArea: "comments",
    overflowX: 'hidden',
    overflowY: 'scroll',
    display: "grid",
    gridTemplateAreas: "'commentBox CommentTextField'",
    gridTemplateColumns: "50% 30%"
  }
});

const CommentArea = ({ comments, addComment, classes }) => (
  <div className={classes.container}>
    <CommentBox comments={comments} />
    <CommentTextField addComment={addComment} />
  </div>
);

CommentArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentArea);
