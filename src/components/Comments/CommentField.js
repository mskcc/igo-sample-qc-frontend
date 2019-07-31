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
    height: '60%'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button: {
    float: "right",
    height: '50px',
    margin: theme.spacing(1)
  }
}));

export default function CommentField() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "Cat in the Hat",
    age: "",
    multiline: "Controlled",
    currency: "EUR"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-multiline-static"
        label="New Comment"
        multiline
        rows="3"
        placeholder="Your Comment"
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <Button variant="contained" color="primary" className={classes.button}>
        Submit
      </Button>
    </form>
  );
}
