import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CommentBox from "./CommentBox";
import CommentField from "./CommentField";

const styles = theme => ({
  container: {
    textAlign: "center",
    gridArea: "comments",
    width: "85vw",
    height: "100%",
    display: 'grid',
    gridTemplateAreas: "'commentBox commentField'",
    gridTemplateColumns: '80% 20%'
  }
});

const CommentArea = ({ comments, classes }) => (
  <div className={classes.container}>
    <CommentBox comments={comments} />
    <CommentField/>
  </div>
);

CommentArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentArea);
