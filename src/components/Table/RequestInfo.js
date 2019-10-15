import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  container: {
    gridArea: "request"
  },
  details: {
    width: 450,
    lineHeight: 2,
    display: "grid",
    gridTemplateAreas: "'a b' "
  }
}));

export default function RequestInfo(props) {
  const classes = useStyles();
  // const [values, setValues] = React.useState({
  //   multiline: "Controlled"
  // });

  // const handleChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  // const addComment = () => {
  //   ["labHeadName"]
  // ["investigatorName"]
  // ["dataAnalystName"]
  // ["projectManagerName"]
  // };

  return (
    <div className={classes.container}>
      <Typography variant="h5">
        QC Results for {props.request.requestId}
      </Typography>
      <div className={classes.details}>
        <div>
          <div><strong>Lab Head:</strong> {props.request.labHeadName}</div>
          <div><strong>Investigator:</strong> {props.request.investigatorName}</div>
        </div>
        <div>
          <div><strong>Data Analyst:</strong> {props.request.dataAnalystName}</div>
          <div><strong>Project Manager:</strong> {props.request.projectManagerName}</div>
        </div>
      </div>
    </div>
  );
}
