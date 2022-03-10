import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  FormControlLabel,
  Typography,
  TextField,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    width: '95%',
    gridArea: 'editor',
    gridTemplateColumns: '50% 50%',
    gridTemplateAreas: "'editorForm preview''button button'",
    alignItems: 'start',
    justifyItems: 'start',
    paddingBottom: theme.spacing(2),
  },
  editorForm: {
    height: '100%',
    borderRight: '2px solid lightgray',
    gridArea: 'editorForm',
  },
  materialInput: { minWidth: '170px' },
  preview: {
    gridArea: 'preview',
    marginLeft: theme.spacing(3),
  },
  highlight: { backgroundColor: '#8fc7e8' },
  green: {
    backgroundColor: '#a6ce39',
  },
  yellow: {
    backgroundColor: '#ffc20e',
  },
  red: {
    backgroundColor: '#b1132d',
    color: 'white',
  },
  formControl: { margin: theme.spacing(2), marginLeft: 0, minWidth: '170px' },
  input: { float: 'right' },
  select: { float: 'right' },
  button: {
    borderTop: '2px solid lightgray',
    marginTop: '2em',
    paddingTop: '1em',
    width: '100%',
    textAlign: 'center',
    gridArea: 'button',
  },
  section: { marginLeft: '2em', maxWidth: '80%' },
  sectionHeader: {
    fontWeight: 700,
    fontSize: '1.1em',
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function CommentEditor(props) {
  const classes = useStyles();
  const commentEl = useRef(null);
  const [values, setValues] = React.useState({
    'DNA Report': false,
    'RNA Report': false,
    'Library Report': false,
    salutation: '',
    addressee: '',
    downstreamProcess:
      props.currentReportShown === 'Library Report' ||
      props.currentReportShown === 'Pool Report'
        ? 'sequencing'
        : props.recipe,
    service: '',
    pass: false,
    try: false,
    fail: false,
    rnaChecked: false,
    valid: false,
    movingForward: false,
    confirmationRequested: false,
    sequencingRequested: false,
    tumorNormalMatchNote: false,
    suboptimalQuantity: false,
    sizeSelection: false,
  });

  const handleChange = (name) => (event) => {
    if (event.target.value !== 'default') {
      setValues({
        ...values,
        [name]: event.target.value,
      });
    }
  };

  const handleCheckbox = (name) => (event) => {
    setValues({ ...values, [name]: !values[name] });
  };

  const handleInitialComment = () => {
    props.handleInitialComment(commentEl.current.textContent, values);
  };

  return (
    <div className={classes.container}>
      <div className={classes.editorForm}>
        <div>
          {Object.keys(props.tables).length > 0 && (
            <React.Fragment>
              <div className={classes.sectionHeader}>
                <i className="material-icons">keyboard_arrow_right</i> Which
                report should this comment be added to?
              </div>
              <div className={classes.section}>
                {Object.keys(props.tables).map((report, index) => {
                  if (
                    report.includes('Report') &&
                    !props.comments[report] &&
                    !report.includes('Covid')
                  ) {
                    return (
                      <span key={report}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              // checked={values.report}
                              onChange={handleCheckbox(report)}
                              // value={report}
                            />
                          }
                          label={report}
                        />
                      </span>
                    );
                  } else return null;
                })}
              </div>
            </React.Fragment>
          )}
          <form>
            <div className={classes.sectionHeader}>
              <i className="material-icons">keyboard_arrow_right</i> Fill in the
              blanks:{' '}
            </div>
            <div className={classes.section}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="salutation-simple">Salutation</InputLabel>
                <Select
                  value={values.salutation}
                  onChange={handleChange('salutation')}
                  inputProps={{
                    name: 'salutation',
                    id: 'salutation-simple',
                  }}
                >
                  <MenuItem value="Morning">Morning</MenuItem>
                  <MenuItem value="Afternoon">Afternoon</MenuItem>
                  <MenuItem value="Evening">Evening</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="addressee-simple"
                label="Addressee"
                className={classes.formControl}
                onChange={handleChange('addressee')}
                margin="normal"
              />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="servicePerformed-simple">
                  Service Performed
                </InputLabel>
                <Select
                  value={values.service}
                  onChange={handleChange('service')}
                  inputProps={{
                    name: 'servicePerformed',
                    id: 'servicePerformed-simple',
                  }}
                >
                  <MenuItem value="10x cDNA preparation">
                    10x cDNA preparation
                  </MenuItem>
                  <MenuItem value="Extraction">Extraction</MenuItem>
                  <MenuItem value="DNA QC">DNA QC</MenuItem>
                  <MenuItem value="cDNA QC">cDNA QC</MenuItem>
                  <MenuItem value="Library Prep">Library Prep</MenuItem>
                  <MenuItem value="Library QC">Library QC</MenuItem>
                  <MenuItem value="Pool QC">Pool QC</MenuItem>
                  <MenuItem value="RNA QC">RNA QC</MenuItem>
                  <MenuItem value="Pathology">Pathology</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="downstreamProcess-simple"
                label="Downstream Process"
                className={classes.formControl}
                onChange={handleChange('downstreamProcess')}
                margin="normal"
                value={values.downstreamProcess}
              />
              <br />
            </div>
            <div className={classes.sectionHeader}>
              <i className="material-icons">keyboard_arrow_right</i> Select all
              QC statuses present in this report/project:
            </div>
            <div className={classes.section}>
              <FormControlLabel
                control={
                  <Checkbox onChange={handleCheckbox('pass')} value="pass" />
                }
                label={'pass'}
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={handleCheckbox('try')} value="try" />
                }
                label={'try'}
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={handleCheckbox('fail')} value="fail" />
                }
                label={'fail'}
              />
            </div>
            {values.try && (
              <div className={classes.section}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="rnaChecked-simple">
                    RNA application?
                  </InputLabel>
                  <Select
                    value={values.rnaChecked}
                    onChange={handleCheckbox('rnaChecked')}
                    inputProps={{
                      name: 'rnaChecked',
                      id: 'rnaChecked-simple',
                    }}
                  >
                    <MenuItem value="default" />
                    <MenuItem value="true">yes</MenuItem>
                    <MenuItem value="false">no</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
            <br />

            <React.Fragment>
              <div className={classes.sectionHeader}>
                <i className="material-icons">keyboard_arrow_right</i> Add
                additional Instructions:
              </div>
              <div className={classes.section}>
                {values.pass && !values.try && !values.fail && (
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleCheckbox('movingForward')} />
                    }
                    label='Add: "All samples pass for XYZ and are moving forward."'
                  />
                )}
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckbox('onHold')} />}
                  label="IGO will put this project on hold until decisions are submitted in the grid below."
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleCheckbox('confirmationRequested')}
                    />
                  }
                  label={
                    'Please confirm that the samples look as expected in order to continue to sequencing.'
                  }
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleCheckbox('sequencingRequested')}
                    />
                  }
                  label={
                    'If you are ready to move forward to sequencing, please fill out an iLab request and notify our Sample ' +
                    'and Project Management team of the IGO ID number by emailing zzPDL_SKI_IGO_Sample_and_Project_Management@mskcc.org.'
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleCheckbox('tumorNormalMatchNote')}
                    />
                  }
                  label={
                    'Please note: If a Tumor or Normal fails, its matched T/N should be eliminated.'
                  }
                />
                {(values['Library Report'] || values['Pool Report']) && (
                  <React.Fragment>
                    <FormControlLabel
                      control={
                        <Checkbox onChange={handleCheckbox('unevenLibrary')} />
                      }
                      label={
                        ' Please note that because the library profiles are not even, the sequencing results may be unbalanced when sequenced together.'
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox onChange={handleCheckbox('sizeSelection')} />
                      }
                      label={
                        ' These samples have adapters and/or fragments over 1kb that could affect the sequencing balance across the project. We recommend for you to do size selection.'
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleCheckbox('suboptimalQuantity')}
                        />
                      }
                      label={
                        ' However, the quantity is only sufficient for one attempt so we cannot guarantee the requested reads.'
                      }
                    />
                  </React.Fragment>
                )}
              </div>
            </React.Fragment>
          </form>
        </div>
      </div>
      <div className={classes.preview}>
        <Typography variant="h5" component="h3">
          Preview
        </Typography>
        <div ref={commentEl}>
          <br />
          Good{' '}
          {values.salutation || (
            <span className={classes.highlight}>...</span>
          )}{' '}
          {values.addressee || <span className={classes.highlight}>...</span>}
          ,
          <br />
          IGO has completed{' '}
          {values.service || <span className={classes.highlight}>...</span>} on
          Project {props.request.requestId}.
          <br />
          Please see the reports and documents below for the results.
          <br />
          <br />
          {values.pass &&
            !values.try &&
            !values.fail &&
            (values.movingForward ? (
              <span>
                All of the samples in this project{' '}
                <span className={classes.green}>pass</span> IGO’s QC
                specifications for {values.downstreamProcess} and are moving
                forward.
              </span>
            ) : (
              <span>
                All of the samples in this project{' '}
                <span className={classes.green}>pass</span> IGO’s QC
                specifications for {values.downstreamProcess}.
              </span>
            ))}
          {values.pass && (values.try || values.fail) && (
            <span>
              Some of the samples in this project{' '}
              <span className={classes.green}>pass</span> IGO’s QC
              specifications for {values.downstreamProcess}.
            </span>
          )}
          {values.try &&
            ((values['Library Report'] || values['Pool Report']) &&
            !values['DNA Report'] &&
            !values['RNA Report'] ? (
              <span>
                <br />
                Samples highlighted in{' '}
                <span className={classes.yellow}>yellow</span> fall just below
                our quantitative and/or qualitative standards; however, we can
                still move forward and see how the samples perform at the
                sequencing level.
              </span>
            ) : (
              <span>
                <br />
                Samples highlighted in{' '}
                <span className={classes.yellow}>yellow</span> fall just below
                our quantitative and/or qualitative standards for{' '}
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
            ))}
          {values.fail && (
            <span>
              <br />
              Samples highlighted in <span className={classes.red}>
                red
              </span>{' '}
              fail our quantitative and/or qualitative standards for{' '}
              {values.downstreamProcess}. IGO recommends these samples be
              removed from processing.
            </span>
          )}
          <br />
          {values.onHold && (
            <span>
              <br />
              IGO will put this project on hold until decisions are submitted in
              the grid below.
            </span>
          )}
          {values.confirmationRequested && (
            <span>
              {' '}
              <br />
              Please confirm that the samples look as expected in order to
              continue to sequencing.
            </span>
          )}{' '}
          {values.sequencingRequested && (
            <span>
              {' '}
              <br />
              If you are ready to move forward to sequencing, please fill out an
              iLab request and notify our Sample and Project Management Team of
              the IGO ID number by emailing
              zzPDL_SKI_IGO_Sample_and_Project_Management@mskcc.org.
            </span>
          )}
          {values.tumorNormalMatchNote && (
            <span>
              {' '}
              <br />
              Please note: If a Tumor or Normal fails, its matched T/N should be
              eliminated.
            </span>
          )}
          {values.unevenLibrary && (
            <span>
              {' '}
              <br />
              Please note that because the library profiles are not even, the
              sequencing results may be unbalanced when sequenced together.
            </span>
          )}{' '}
          {values.suboptimalQuantity && (
            <span>
              {' '}
              <br />
              However, the quantity is only sufficient for one attempt so we
              cannot guarantee the requested reads.
            </span>
          )}
          {values.sizeSelection && (
            <span>
              {' '}
              <br />
              These samples have adapters and/or fragments over 1kb that could
              affect the sequencing balance across the project. We recommend for
              you to do size selection.
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
            ((values['DNA Report'] ||
              values['RNA Report'] ||
              values['Pathology Report'] ||
              values['Pool Report'] ||
              values['Library Report']) &&
              values.salutation !== '' &&
              values.addressee !== '' &&
              values.downstreamProcess !== '' &&
              values.service !== '') === false ||
            props.recipientsBeingEdited === true
          }
        >
          Continue to Review
        </Button>
      </div>
    </div>
  );
}
