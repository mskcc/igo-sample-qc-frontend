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
    overflowX: "auto"
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
  return (
    <div id="comment-box" className={classes.container}>
      {comments.map((comment, i) => (
        <Comment
          author={comment.author}
          content={comment.content}
          date={
            convert(comment.date * 1000) +
            ", " +
            new Date(comment.date * 1000).toLocaleDateString(undefined, {
              day: "numeric",
              month: "numeric",
              year: "numeric"
            })
          }
          alignement={"username" === comment.author ? "right" : "left"}
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
