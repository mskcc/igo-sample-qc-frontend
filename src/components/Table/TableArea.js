import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  Box,
  Typography
} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Table from "./Table";
import RequestInfo from "./RequestInfo";
import "handsontable/dist/handsontable.full.css";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: "2em",
    paddingLeft: "2em",
    textAlign: "left",
    // marginRight: theme.spacing(3),
    gridArea: "table",
    display: "grid",
    gridTemplateAreas: "'toolbar' 'reports'",
    gridRowGap: "1em",
    gridColumnGap: "2em",
    // gridArea: "comments",
    // width: "85vw",
    overflow: "scroll",
    paddingBottom: theme.spacing(2),
    backgroundColor: "rgba(0, 148, 144, .08)",
    borderTop: "2px solid darkgray"
    // display: "grid"
    // gridTemplateAreas: "'table NewCommentArea'",
    // gridTemplateColumns: "70% 30%"
  },

  table: {
    gridArea: "table"
  },
  toolbar: {
    display: "grid",
    gridTemplateAreas: "'request submit-btn download-btn'",
    width: "fit-content",
    gridColumnGap: "1em"
  },
  submitBtn: {
    gridArea: "submit-btn",
    width: "fit-content",
    height: "4em",
    alignSelf: "center"
  },
  downloadtBtn: {
    gridArea: "download-btn",
    width: "fit-content",
    height: "4em",
    alignSelf: "center"
  },
  decisions: {
    paddingBottom: "11px"
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={children.length}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function TableArea(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
    // console.log(newValue)
    props.updateReportShown(Object.keys(props.report.tables)[newValue]);
  }

  function handleReportDownload(index) {
    props.handleReportDownload(Object.keys(props.report.tables)[value]);
  }

  return (
    <div className={classes.container}>
      <div className={classes.toolbar}>
        <RequestInfo request={props.report.request} />
        {props.report.reportShown.includes("Report") && (
          <React.Fragment>
            {props.report.tables[props.report.reportShown].readOnly ? (
              <Card>
                <CardContent className={classes.decisions}>
                  <Typography
                    color="textSecondary"
                    // gutterBottom
                  >
                    Decisions have been submitted.
                  </Typography>
                  <Typography variant="body1">
                    To make any changes, please reach out <br /> to IGO at
                    <a href="mailto:zzPDL_CMO_IGO@mskcc.org">
                      {" "}
                      zzPDL_CMO_IGO@mskcc.org
                    </a>
                    .
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              !props.report.reportShown.includes("Pathology") && (
                <Button
                  onClick={props.handleSubmit}
                  variant="contained"
                  color="primary"
                  className={classes.submitBtn}
                >
                  Submit Decisions
                </Button>
              )
            )}
            <Button
              onClick={handleReportDownload}
              variant="contained"
              color="secondary"
              className={classes.downloadtBtn}
              startIcon={<CloudDownloadIcon />}
            >
              {Object.keys(props.report.tables)[value]}
            </Button>
          </React.Fragment>
        )}
      </div>
      <div className={classes.report}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {Object.keys(props.report.tables).map((report, index) => (
            <Tab key={report} label={report} {...a11yProps(index)} />
          ))}
        </Tabs>

        {Object.keys(props.report.tables).map((report, index) => (
          <TabPanel key={report} value={value} index={index}>
            {value === index && (
              <Table
                handleAttachmentDownload={props.handleAttachmentDownload}
                registerChange={props.registerChange}
                data={props.report.tables[report]}
              />
            )}
          </TabPanel>
        ))}
      </div>
    </div>
  );
}
