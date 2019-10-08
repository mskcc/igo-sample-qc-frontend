import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center",
    gridArea: "sidebar",
    minHeight: "92vh",
    backgroundColor: "#eceff1",
    display: "grid",
    gridTemplate: "'search' 'tree'",
    justifyItems: "center",
    borderRight: "2px solid darkgray"
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
          onKeyPress={event => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
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
