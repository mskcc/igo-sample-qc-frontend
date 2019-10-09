import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import CommentEditor from "./CommentEditor";
import RecipientList from "./RecipientList";

const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    width: "100%",
    // minHeight: "100%",

    // gridTemplateRows: "80% 20%",
    gridTemplateAreas: "'editor' 'emails-submit'",

    gridColumnGap: "2em",
    gridRowGap: "2em",
    alignItems: "center",
    justifyItems: "center",
    margin: theme.spacing(3, 4)
    // height: " 60vh",
  },
  editor: {
    gridArea: "editor"
  },
  emailsSubmit: {
    width: "100%",
    gridArea: "emails-submit",
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    gridTemplateAreas: "'emails submit'"
  },
  emails: { gridArea: "emails", alignSelf: "start" },
  button: {
    gridArea: "submit",
    height: "40px",
    width: "30%"
  }
}));

export default function CommentEditorArea(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CommentEditor
        recipe={props.recipe}
        currentReportShown={props.reportShown}
        request={props.request}
        tables={props.tables}
      />

      <div className={classes.emailsSubmit}>
        <RecipientList
          handleSubmit={props.handleRecipientSubmit}
          recipients={props.recipients}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit & Notify
        </Button>
      </div>
    </div>
  );
}
