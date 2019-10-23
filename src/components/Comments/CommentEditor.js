import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  FormControlLabel,
  Typography,
  TextField,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  InputLabel
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    width: "100%",
    gridArea: "editor",
    gridTemplateColumns: "50% 50%",
    gridTemplateAreas: "'editorForm preview''button button'",
    alignItems: "start",
    justifyItems: "start",
    paddingBottom: theme.spacing(2)
  },
  editorForm: {
    height: "100%",
    borderRight: "2px solid lightgray",
    gridArea: "editorForm"
  },
  materialInput: { minWidth: "170px" },
  preview: {
    gridArea: "preview",
    marginLeft: theme.spacing(3)
  },
  highlight: { backgroundColor: "#8fc7e8" },
  yellow: {
    backgroundColor: "#ffc20e"
  },
  red: {
    backgroundColor: "#b1132d",
    color: "white"
  },
  formControl: { margin: theme.spacing(2), marginLeft: 0, minWidth: "170px" },
  input: { float: "right" },
  select: { float: "right" },
  button: {
    borderTop: "2px solid lightgray",
    marginTop: "2em",
    paddingTop: "1em",
    width: "100%",
    textAlign: "center",
    gridArea: "button"
  }
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
    salutation: "",
    addressee: "",
    downstreamProcess: props.recipe,
    service: "",
    bodyType: "",
    rnaChecked: "",
    valid: false
  });
  // const [values, setValues] = React.useState({
  //   reports: {
  //     "DNA Report": false,
  //     "RNA Report": false,
  //     "Library Report": false
  //   },
  //   salutation: "das",
  //   addressee: "dsada",
  //   downstreamProcess: props.recipe,
  //   service: "dsa",
  //   bodyType: "da",
  //   rnaChecked: "",
  //   valid: false
  // });

  const handleChange = name => event => {
    if (event.target.value !== "default") {
      setValues({
        ...values,
        [name]: event.target.value,
        valid: validate()
      });
    }
  };

  const handleCheckbox = name => event => {
    setValues({ ...values, [name]: !values[name] });
  };
  const handleReportsCheckbox = name => event => {
    console.log(values.valid);
    setValues({
      ...values,
      valid: validate(),
      reports: {
        ...values.reports,
        [name.report]: !values.reports[name.report]
      }
    });
  };

  const handleInitialComment = () => {
    props.handleInitialComment(commentEl.current.textContent, values.reports);
  };

  const validate = () => {
    return (
      values.salutation !== "" &&
      values.addressee !== "" &&
      values.downstreamProcess !== "" &&
      values.service !== ""
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.editorForm}>
        <Typography variant="h5" component="h3">
          QC Report Comment Editor
        </Typography>
        <div>
          {Object.keys(props.tables).length > 0 && (
            <span>
              Which report should this comment be added to?
              <br />
              {Object.keys(props.tables).map((report, index) => {
                if (report.includes("Report") && !props.comments[report]) {
                  return (
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
                  );
                } else return null;
              })}
            </span>
          )}
          <form>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="salutation-simple">Salutation</InputLabel>
              <Select
                value={values.salutation}
                onChange={handleChange("salutation")}
                inputProps={{
                  name: "salutation",
                  id: "salutation-simple"
                }}
              >
                <MenuItem value="Morning">Morning</MenuItem>
                <MenuItem value="Evening">Evening</MenuItem>
                <MenuItem value="Hello">Hello</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="addressee-simple"
              label="Addressee"
              className={classes.formControl}
              onChange={handleChange("addressee")}
              margin="normal"
            />

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

            <TextField
              id="downstreamProcess-simple"
              label="Downstream Process"
              className={classes.formControl}
              onChange={handleChange("downstreamProcess")}
              margin="normal"
              value={values.downstreamProcess}
            />

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
                    "Please confirm that the samples look as expected in order to continue to sequencing."
                  }
                />
              </span>
            )}
          </form>
        </div>
      </div>
      <div className={classes.preview}>
        <Typography variant="h5" component="h3">
          Preview
        </Typography>
        <div ref={commentEl}>
          <br />
          Good{" "}
          {values.salutation || (
            <span className={classes.highlight}>...</span>
          )}{" "}
          {values.addressee || <span className={classes.highlight}>...</span>}
          ,
          <br />
          IGO has completed{" "}
          {values.service || <span className={classes.highlight}>...</span>} on
          Project {props.request.requestId}.
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
          {values.bodyType === "try" && (
            <span>
              <br />
              Samples highlighted in{" "}
              <span className={classes.yellow}>yellow</span> fall just below our
              quantitative and/or qualitative standards for{" "}
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
          {values.fullSampleSet === false && (
            <span>
              According to iLab, this is not a full sample set. When your sample
              set is complete and you are ready to move forward to sequencing,
              please fill out an iLab request and email our Sample Receiving
              team the IGO number.
              <br />
              Will these samples be submitted for sequencing? If so, please
              contact IGO to discuss your downstream sequencing options before
              submitting your new iLab request.
            </span>
          )}
          {values.service === "Extraction" && (
            <span>
              Will these samples be submitted for sequencing? If so, please
              contact IGO to discuss your downstream sequencing options before
              submitting your new iLab request. In order to move forward to
              sequencing, please fill out an iLab request and notify our Sample
              Receiving team of the IGO number by emailing
              zzPDL_SKI_IGO_SampleReceiving@mskcc.org.
            </span>
          )}
          <br />
          <br />
          Please reply here if you have any questions or comments.
          <br />
        </div>
      </div>

      <div className={classes.button}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleInitialComment}
          disabled={
            values.valid == false || props.recipientsBeingEdited == true
          }
        >
          Continue to Review
        </Button>
      </div>
    </div>
  );
}
