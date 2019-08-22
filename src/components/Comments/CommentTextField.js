import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  container: {
    // display: "flex",
    // alignItems: "flex-end",
    // flexWrap: "wrap",
    // justifyContent: "flex-end",
    display: "grid",
    gridTemplateRows: "80% 20%",
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
    float: "right",
    height: "40px",
    width: "30%"
  }
}));

export default function CommentTextField(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    multiline: "Controlled"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const addComment = () => {
    props.addComment(values.comment);
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
      <Button
        variant="contained"
        onClick={addComment}
        color="primary"
        disabled={values.comment ? false : true}
        className={classes.button}
      >
        Submit
      </Button>
    </form>
  );
}
