import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import { Paper, Typography, TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  editorContainer: {
    display: "grid",
    width: "80%",
    gridTemplateColumns: "50% 50%",
    gridColumnGap: "2em",
    alignItems: "start",
    justifyItems: "start",
    height: "100%",
    minHeight: " 50vh",
    margin: theme.spacing(3)
  },
  editor: {
    padding: theme.spacing(3, 4)
  },
  preview: { padding: theme.spacing(3, 4) },
  button: {
    // float: "left",
    height: "40px",
    width: "30%"
  },
  yellow: {
    backgroundColor: "#ffc20e"
    // fontWeight: "bold"
  },
  red: {
    backgroundColor: "#b1132d",
    color: "white"
    // fontWeight: "bold"
  }
}));

export default function CommentEditor(props) {
  const classes = useStyles();
  const commentEl = useRef(null);

  const [values, setValues] = React.useState({
    salutation: "...",
    addressee: "...",
    downstreamProcess: "...",
    service: "...",
    bodyType: null,
    rnaChecked: null
  });

  const handleChange = name => event => {
    if (event.target.value != "default") {
      setValues({ ...values, [name]: event.target.value });
    }
  };

  const addComment = () => {
    props.addComment(commentEl.current.textContent);
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.editorContainer}>
        <div className={classes.editor}>
          <Typography variant="h5" component="h3">
            Generate Comment
          </Typography>
          <Typography component="p">
            <br />
            Salutation:{" "}
            <select onChange={handleChange("salutation")}>
              <option value="default">Salutation</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>{" "}
            <br />
            Addressee:{" "}
            <input
              onChange={handleChange("addressee")}
              type="text"
              placeholder="(Dr.) User"
            />
            <br />
            <br />
            Service Performed:{" "}
            <select onChange={handleChange("service")}>
              <option value="default" />
              <option value="Extraction">Extraction</option>
              <option value="DNA QC">DNA QC</option>
              <option value="RNA QC">RNA QC</option>
            </select>
            <br />
            <br />
            Downstream Process:{" "}
            <input
              type="text"
              placeholder="Downstream Process"
              onChange={handleChange("downstreamProcess")}
            />
            <br />
            Generate comment body by Result:
            <select onChange={handleChange("bodyType")}>
              <option value="default">result</option>
              <option value="pass">all samples PASS</option>
              <option value="try">some samples TRY</option>
              <option value="fail">some samples FAIL</option>
            </select>
            <br />
            {values.bodyType === "try" && (
              <span>
                RNA application?{" "}
                <select onChange={handleChange("rnaChecked")}>
                  <option value="default" />
                  <option value="true">yes</option>
                  <option value="false">no</option>
                </select>
              </span>
            )}
            <br />
            <br />
            <br />
            {values.service !== "..." && values.service !== "Extraction" && (
              <span>
                {" "}
                Instructions if any samples do not pass QC or are user made
                libraries (does not apply to extractions):
                <br />
                <input type="checkbox" onChange={handleChange("onHold")} />
                IGO will put this project on hold until you let us know how you
                would like to proceed.
                <br />
                <input
                  type="checkbox"
                  onChange={handleChange("confirmationRequested")}
                />
                Please confirm that the [amplicons/libraries/pools] look as
                expected in order to continue to sequencing.
                <br />
              </span>
            )}
            {values.service == "Extraction" && (
              <span>
                Is this a full sample set?{" "}
                <select onChange={handleChange("fullSampleSet")}>
                  <option value="default" />
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </select>
              </span>
            )}
          </Typography>
        </div>
        <div className={classes.preview}>
          <Typography variant="h5" component="h3">
            Preview
          </Typography>
          <Typography component="p" ref={commentEl}>
            <br />
            Good {values.salutation} {values.addressee},
            <br />
            IGO has completed {values.service} on Project{" "}
            {props.request.requestId}.
            <br />
            Please see the tables and documents below for the results.
            <br />
            <br />
            {values.bodyType === "pass" && (
              <span>
                All of the samples in this project pass IGO’s QC specifications
                for {values.downstreamProcess}.
              </span>
            )}
            {values.bodyType == "try" && (
              <span>
                <br />
                Samples highlighted in{" "}
                <span className={classes.yellow}>yellow</span> fall just below
                our quantitative and/or qualitative standards for{" "}
                {values.downstreamProcess}; however, we can still try to prepare
                libraries.
                {values.rnaChecked && (
                  <span>
                    Please note that if you decide to move forward with samples
                    containing suboptimal quantities, we will need to normalize
                    ALL samples to the lowest starting amount.
                  </span>
                )}
              </span>
            )}
            {values.bodyType === "fail" && (
              <span>
                Samples highlighted in <span className={classes.red}>red</span>{" "}
                fail our quantitative and/or qualitative standards for{" "}
                {values.downstreamProcess}. IGO recommends these samples be
                removed from processing.
              </span>
            )}
            <br />
            <br />
            {values.onHold && (
              <span>
                IGO will put this project on hold until you let us know how you
                would like to proceed.
              </span>
            )}
            {values.confirmationRequested && (
              <span>
                Please confirm that the [amplicons/libraries/pools] look as
                expected in order to continue to sequencing.
              </span>
            )}
            <br />
            {values.fullSampleSet && (
              <span>
                According to iLab, this is a full sample set. In order to move
                forward to sequencing, please fill out an iLab request and email
                our Sample Receiving team the IGO number.
              </span>
            )}
            {values.fullSampleSet == false && (
              <span>
                According to iLab, this is not a full sample set. When your
                sample set is complete and you are ready to move forward to
                sequencing, please fill out an iLab request and email our Sample
                Receiving team the IGO number.
                <br />
                Will these samples be submitted for sequencing? If so, please
                contact IGO to discuss your downstream sequencing options before
                submitting your new iLab request.
              </span>
            )}
            <br />
            <br />
            Please reply here if you have any questions or comments.
            <br />
          </Typography>
        </div>
      </Paper>
      <Button
        variant="contained"
        onClick={addComment}
        color="primary"
        // disabled={values.comment ? false : true}
        className={classes.button}
      >
        Submit
      </Button>
    </div>
  );
}
