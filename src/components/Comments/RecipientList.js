import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CommentEditor from "./CommentEditor";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  container: {
    gridArea: "emails",
    alignSelf: "start",
    justifySelf: "start"
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
      <Typography variant="h5" component="h3">
        Recipients
      </Typography>
      <span>
        {Object.keys(props.request).map(
          (key, index) =>
            key.toLowerCase().includes("email") &&
            props.request[key] &&
            (key.toLowerCase().includes("contact") ? (
              <div key={key}>
                <div className={classes.email}>
                  {key.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}:
                </div>
                <div>
                  {props.request[key].split(";").map((email, index) => (
                    <div>{email}</div>
                  ))}
                </div>
                <br />
              </div>
            ) : (
              <div key={key}>
                <div className={classes.email}>
                  {key.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}:
                </div>
                <div>{props.request[key].replace(/;/gi, "\n")}</div>
              </div>
            ))
        )}
      </span>
    </div>
  );
}
