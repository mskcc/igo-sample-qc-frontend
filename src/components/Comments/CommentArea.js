import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CommentBox from "./CommentBox";
import CommentField from "./CommentField";

const styles = theme => ({
  container: {
    textAlign: "center",
    gridArea: "comments",
    width: "85vw",
    height: "100%",
    display: "grid",
    gridTemplateAreas: "'commentBox commentField'",
    gridTemplateColumns: "70% 30%"
  }
});

const CommentArea = ({ comments, addComment, classes }) => (
  <div className={classes.container}>
    <CommentBox comments={comments} />
    <CommentField addComment={addComment} />
  </div>
);

CommentArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentArea);
