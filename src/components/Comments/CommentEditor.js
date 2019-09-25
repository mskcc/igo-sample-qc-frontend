import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import {
  FormGroup,
  FormControlLabel,
  Paper,
  Typography,
  TextField,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  InputLabel
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  editorContainer: {
    display: "grid",
    width: "80%",
    gridTemplateColumns: "50% 50%",
    gridColumnGap: "2em",
    alignItems: "start",
    justifyItems: "start",
    height: "100%",
    height: " 60vh",
    margin: theme.spacing(3)
  },
  editor: {
    padding: theme.spacing(3, 4),
    width: "80%"
  },
  editorForm: { display: "grid", gridTemplateColumns: "50% 50%" },
  materialInput: { minWidth: "170px" },
  preview: { padding: theme.spacing(3, 4) },
  highlight: { backgroundColor: "#8fc7e8" },
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
  },
  formControl: { minWidth: "170px" },
  input: { float: "right" },
  select: { float: "right" }
}));

export default function CommentEditor(props) {
  const classes = useStyles();
  const commentEl = useRef(null);

  const [values, setValues] = React.useState({
    reports: {
      "DNA Report": false,
      "RNA Report": false,
      "Library Report": false
    },
    salutation: <span className={classes.highlight}>...</span>,
    addressee: <span className={classes.highlight}>...</span>,
    downstreamProcess: props.recipe,
    service: <span className={classes.highlight}>...</span>,
    bodyType: null,
    rnaChecked: null
  });

  const handleChange = name => event => {

    if (event.target.value != "default") {
      setValues({ ...values, [name]: event.target.value });
    }
    console.log(values)
  };

  const handleCheckbox = name => event => {
    setValues({ ...values, [name]: !values.name });
  };
  const handleReportsCheckbox = name => event => {
    setValues({
      ...values,
      reports: {
        ...values.reports,
        [name.report]: !values.reports[name.report]
      }
    });
  };

  const addInitialComment = () => {
    props.addInitialComment(commentEl.current.textContent, values.reports);
  };
  return (
    <div className={classes.container}>
      <Paper className={classes.editorContainer}>
        <div className={classes.editor}>
          <Typography variant="h5" component="h3">
            Editor
          </Typography>
          <Typography component="p">
            <br />
            {/* Individual initial comment per table or same one accross? Only show if more than 1 table available */}
            {Object.keys(props.tables).length > 1 && (
              <span>
                Which report should this comment be added to?
                <br />
                {Object.keys(props.tables).map((report, index) => (
                  <span key={report}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          // checked={values.report}
                          onChange={handleReportsCheckbox({ report })}
                          // value={report}
                        />
                      }
                      label={report}
                    />
                  </span>
                ))}
              </span>
            )}
            <br />
            <br />

            <InputLabel htmlFor="salutation-simple">Salutation</InputLabel>
            <Select
              value={values.salutation}
              onChange={handleChange("salutation")}
              className={classes.materialInput}
              inputProps={{
                name: "salutation",
                id: "salutation-simple"
              }}
            >
              <MenuItem value="Morning">Morning</MenuItem>
              <MenuItem value="Evening">Evening</MenuItem>
            </Select>
            <br />
            <TextField
              id="addressee-simple"
              label="Addressee"
              className={classes.materialInput}
              onChange={handleChange("addressee")}
              margin="normal"
            />

            <br />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="servicePerformed-simple">
                Service Performed
              </InputLabel>
              <Select
                value={values.service}
                onChange={handleChange("service")}
                inputProps={{
                  name: "servicePerformed",
                  id: "servicePerformed-simple"
                }}
              >
                <MenuItem value="default" />
                <MenuItem value="Extraction">Extraction</MenuItem>
                <MenuItem value="DNA QC">DNA QC</MenuItem>
                <MenuItem value="RNA QC">RNA QC</MenuItem>
                <MenuItem value="Library Prep">Library Prep</MenuItem>
              </Select>
            </FormControl>
            <br />
            <TextField
              id="downstreamProcess-simple"
              label="Downstream Process"
              className={classes.formControl}
              onChange={handleChange("downstreamProcess")}
              margin="normal"
              value={values.downstreamProcess}
            />

            <br />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="bodyType-simple">QC Result</InputLabel>
              <Select
                value={values.bodyType}
                onChange={handleChange("bodyType")}
                inputProps={{
                  name: "bodyType",
                  id: "bodyType-simple"
                }}
              >
                <MenuItem value="default" />
                <MenuItem value="pass">all samples PASS</MenuItem>
                <MenuItem value="try">some samples TRY</MenuItem>
                <MenuItem value="fail">some samples FAIL</MenuItem>
              </Select>
            </FormControl>
            <br />
            {values.bodyType === "try" && (
              <span>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="rnaChecked-simple">
                    RNA application?
                  </InputLabel>
                  <Select
                    value={values.rnaChecked}
                    onChange={handleChange("rnaChecked")}
                    inputProps={{
                      name: "rnaChecked",
                      id: "rnaChecked-simple"
                    }}
                  >
                    <MenuItem value="default" />
                    <MenuItem value="true">yes</MenuItem>
                    <MenuItem value="false">no</MenuItem>
                  </Select>
                </FormControl>
                <br />
              </span>
            )}
            {values.service !== "Extraction" && (
              <span>
                <br /> Add additional Instructions:
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={values.report}
                      onChange={handleCheckbox("onHold")}
                      // value={report}
                    />
                  }
                  label="IGO will put this project on hold until you let us know how you
                would like to proceed."
                />{" "}
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={values.report}
                      onChange={handleCheckbox("confirmationRequested")}
                      // value={report}
                    />
                  }
                  label={
                    "Please confirm that the" +
                    values.sampleType +
                    "look as expected in order to continue to sequencing."
                  }
                />
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
            Please see the reports and documents below for the results.
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
                    <br />
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
            {values.onHold && (
              <span>
                <br />
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
            {values.servicePerformed == "Extraction" && (
              <span>
                {" "}
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
        onClick={addInitialComment}
        color="primary"
        // disabled={values.comment ? false : true}
        className={classes.button}
      >
        Submit & Notify
      </Button>
    </div>
  );
}