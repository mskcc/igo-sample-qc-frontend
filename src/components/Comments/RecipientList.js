import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  container: {
    width: "50%"
  },
  list: {
    display: "grid",
    gridTemplateColumns: "50% 50%"
  },

  button: {
    height: "40px",
    width: "30%"
  },
  email: {
    marginTop: ".5em",
    fontWeight: "bold"
  }
}));

export default function RecipientList(props) {
  const classes = useStyles();

  const [edit, setEdit] = React.useState({
    editView: false
  });
  const [recipients, setRecipients] = React.useState({});

  const handleChange = name => event => {
    setRecipients({ ...recipients, [name]: event.target.value });
  };

  const handleEditClick = recipients => event => {
    setEdit({ editView: true });
    setRecipients({ ...recipients });
    props.handleEdit();
  };

  const handleSubmit = () => {
    setEdit({ editView: false });
    props.handleEdit();
    props.handleSubmit(recipients);
  };

  return (
    <div className={classes.container}>
      {!edit.editView ? (
        <React.Fragment>
          <Typography variant="h5" component="h3">
            QC Report Recipients{" "}
            <IconButton
              size="small"
              onClick={handleEditClick(props.recipients)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
          </Typography>
          <div className={classes.list}>
            {Object.keys(props.recipients).map((key, index) =>
              key.toLowerCase().includes("contact") ? (
                <div key={key + "-" + index}>
                  <div className={classes.email}>{key}:</div>
                  <div>
                    {props.recipients[key].split(/,|;/).map((email, index) => (
                      <div key={key + "-" + index}>{email}</div>
                    ))}
                  </div>
                  <br />
                </div>
              ) : (
                <div key={key + "-" + index}>
                  <div className={classes.email}>{key}:</div>
                  <div>
                    {props.recipients[key]
                      ? props.recipients[key].replace(/;/gi, "\n")
                      : ""}
                  </div>
                </div>
              )
            )}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography variant="h5" component="h3">
            Recipients{" "}
            <IconButton size="small" onClick={handleSubmit} color="primary">
              <CheckCircleOutlineIcon />
            </IconButton>
          </Typography>
          <div>Please separate multiple addresses by comma or semicolon.</div>
          <div className={classes.list}>
            {Object.keys(props.recipients).map((key, index) => (
              <div key={key + "-" + index}>
                <div>
                  <TextField
                    label={key}
                    id={key}
                    value={recipients[key] || ""}
                    className={classes.formControl}
                    onChange={handleChange(key)}
                    margin="normal"
                    multiline
                    rowsMax="4"
                    variant="outlined"
                  />
                </div>
                <br />
              </div>
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
