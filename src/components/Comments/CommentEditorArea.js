import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CommentEditor from "./CommentEditor";
import RecipientList from "./RecipientList";
import Button from "@material-ui/core/Button";

// import {
//   FormControlLabel,
//   Paper,
//   Typography,
//   TextField,
//   Checkbox,
//   FormControl,
//   MenuItem,
//   Select,
//   InputLabel
// } from "@material-ui/core";

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

  const [values, setValues] = React.useState({});

  // const handleChange = name => event => {
  //   if (event.target.value !== "default") {
  //     setValues({ ...values, [name]: event.target.value });
  //   }
  //   console.log(values);
  // };

  // const handleCheckbox = name => event => {
  //   setValues({ ...values, [name]: !values.name });
  // };
  // const handleReportsCheckbox = name => event => {
  //   setValues({
  //     ...values,
  //     reports: {
  //       ...values.reports,
  //       [name.report]: !values.reports[name.report]
  //     }
  //   });
  // };

  // const addInitialComment = () => {
  //   props.addInitialComment(commentEl.current.textContent, values.reports);
  // };
  return (
    <div className={classes.container}>
      <CommentEditor
        recipe={props.recipe}
        currentReportShown={props.reportShown}
        // addInitialComment={addInitialComment}
        request={props.request}
        tables={props.tables}
      />

      <div className={classes.emailsSubmit}>
        <RecipientList request={props.request} />
        <Button
          variant="contained"
          // onClick={addInitialComment}
          color="primary"
          // disabled={values.comment ? false : true}
          className={classes.button}
        >
          Submit & Notify
        </Button>
      </div>
    </div>
  );
}
