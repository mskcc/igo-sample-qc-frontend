import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "right",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    height: "60%",
    marginRight: theme.spacing(3),

  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '90%',
  },
  button: {
    float: "right",
    height: "50px",
    margin: theme.spacing(1)
  }
}));

export default function CommentField(props) {
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
        rows="3"
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
        className={classes.button}
      >
        Submit
      </Button>
    </form>
  );
}
