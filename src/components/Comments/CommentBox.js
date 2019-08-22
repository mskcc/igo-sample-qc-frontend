import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Comment from "./Comment";

const styles = theme => ({
  container: {
    textAlign: "center",
    paddingTop: theme.spacing(1),
    gridArea: "commentBox",
    width: "100%",
    overflowX: "auto",
    borderBottom: "2px solid rgba(0, 0, 0, 0.23)",
    borderRight: "2px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "4px"
  }
});

function convert(t) {
  const dt = new Date(t);
  const hr = dt.getUTCHours();
  const m = "0" + dt.getUTCMinutes();

  return hr - 4 + ":" + m.substr(-2);
}

const CommentBox = ({ comments, classes }) => {
  useEffect(() => {
    var box = document.getElementById("comment-box");
    box.scrollTop = box.scrollHeight;
  });
  console.log(comments[0].comments);
  return (
    <div id="comment-box" className={classes.container}>
      {comments[0].comments.map((comment, i) => (
        // console.log(comment)
        // console.log(i)
        <Comment
          author={comment.username}
          content={comment.comment}
          date={comment.date_created}
          alignement={"patrunoa" === comment.username ? "right" : "left"}
          id={`item_${i + 1}`}
          key={i}
        />
      ))}
    </div>
  );
};

CommentBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentBox);
