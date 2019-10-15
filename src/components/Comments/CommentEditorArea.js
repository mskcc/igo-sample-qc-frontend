import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import CommentEditor from "./CommentEditor";
import RecipientList from "./RecipientList";

const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    width: "100%",
    // minHeight: "100%",

    // gridTemplateRows: "80% 20%",
    gridTemplateAreas: "'recipients' 'editor' ",

    gridRowGap: "2em",
    alignItems: "center",
    justifyItems: "center",
    margin: theme.spacing(3, 4)
    // height: " 60vh",
  },
  editor: {
    gridArea: "editor"
  },
  recipients: {
    width: "100%",
    gridArea: "recipients",
    display: "grid",
    alignItems: "start",
    justifyItems: "start",
    borderBottom: "2px solid lightgray"
  }
}));

export default function CommentEditorArea(props) {
  const classes = useStyles();

  const handleInitialComment = (comment, reports) => {
    props.handleInitialComment(comment,reports)
  };

  return (
    <div className={classes.container}>
      <div className={classes.recipients}>
        <RecipientList
          handleSubmit={props.handleRecipientSubmit}
          recipients={props.recipients}
        />
      </div>
      <CommentEditor
        recipe={props.recipe}
        currentReportShown={props.reportShown}
        request={props.request}
        tables={props.tables}
        comments={props.comments}
        handleInitialComment={handleInitialComment}
      />
    </div>
  );
}
