import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center",
    gridArea: "sidebar",
    height: "92vh",
    backgroundColor: "#eceff1",
    display: "grid",
    gridTemplate: "'search' 'tree'",
    justifyItems: "center"
  },
  search: {
    padding: "2px 4px",
    marginTop: "1em",
    gridArea: "search",
    display: "flex",
    height: "min-content",
    alignItems: "center",
    maxWidth: "80%"
  },
  iconButton: {
    padding: 10
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({ requestId: "" });

  const handleChange = requestId => event => {
    setValues({ ...values, [requestId]: event.target.value });
  };

  const handleSubmit = () => {
    props.handleSubmit(values.requestId);
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.search}>
        <InputBase
          className={classes.textField}
          id="outlined-requestId"
          value={values.requestId}
          placeholder="Request ID"
          onChange={handleChange("requestId")}
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton
          className={classes.iconButton}
          onClick={handleSubmit}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
