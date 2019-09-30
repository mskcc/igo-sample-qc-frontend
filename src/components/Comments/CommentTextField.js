import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateRows: "60% 20%",
    alignItems: "end",
    justifyItems: "end",
    height: "100%",
    marginRight: theme.spacing(3),
    paddingLeft: theme.spacing(2)
  },
  textField: {
    width: "100%"
  },
  button: {
    // float: "right",
    height: "40px",
    width: "100%",
    marginBottom: "1em"
  }
}));

export default function CommentTextField(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    radioSelect: false
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const addComment = (report) => {
    
    props.addComment(values.comment);
  };

  const addCommentToAllReports = (report) => {
    
    props.addCommentToAllReports(values.comment);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-multiline-static"
        label="New Comment"
        multiline
        rows="4"
        placeholder="Your Comment"
        onChange={handleChange("comment")}
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />

      {props.numOfReports > 1 ? (
        <span>
          <Button
            variant="contained"
            onClick={addComment}
            color="primary"
            disabled={values.comment ? false : true}
            className={classes.button}
          >
            Comment on {props.currentReportShown}
          </Button>

          <Button
            variant="contained"
            onClick={addCommentToAllReports}
            color="primary"
            disabled={values.comment ? false : true}
            className={classes.button}
          >
            Comment on all reports
          </Button>
        </span>
      ) : (
        <Button
          variant="contained"
          onClick={addComment}
          color="primary"
          disabled={values.comment ? false : true}
          className={classes.button}
        >
          Comment on Report
        </Button>
      )}
    </form>
  );
}
