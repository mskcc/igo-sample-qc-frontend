import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CommentBox from "./CommentBox";
import CommentTextField from "./CommentTextField";

const styles = theme => ({
  container: {
    textAlign: "center",
    gridArea: "comments",
    overflowX: "hidden",
    overflowY: "scroll",
    display: "grid",
    height: "50vh",
    gridTemplateAreas: "'commentBox CommentTextField'",
    gridTemplateColumns: "50% 30%"
  }
});

const CommentArea = ({
  comments,
  currentReportShown,
  numOfReports,
  currentUser,
  addComment,
  addCommentToAllReports,
  classes
}) => (
  <div className={classes.container}>
    <CommentBox comments={comments} currentUser={currentUser} />
    <CommentTextField
      numOfReports={numOfReports}
      currentReportShown={currentReportShown}
      addComment={addComment}
      addCommentToAllReports={addCommentToAllReports}
    />
  </div>
);

CommentArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentArea);
