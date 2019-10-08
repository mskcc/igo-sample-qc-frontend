import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Tabs, Tab, Box, Typography } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Table from "./Table";
import RequestInfo from "./RequestInfo";
import "handsontable/dist/handsontable.full.css";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: "2em",
    paddingLeft: "2em",
    textAlign: "left",
    marginRight: theme.spacing(3),
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
    // gridTemplateAreas: "'table CommentTextField'",
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
    alignSelf: "end"
  },
  downloadtBtn: {
    gridArea: "download-btn",
    width: "fit-content",
    height: "4em",
    alignSelf: "end"
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
    props.updateReportShown(Object.keys(props.tables)[newValue]);
  }
  return (
    <div className={classes.container}>
      <div className={classes.toolbar}>
        <RequestInfo request={props.request} />
        <Button
          onClick={props.handleSubmit}
          variant="contained"
          color="primary"
          className={classes.submitBtn}
        >
          Submit Decisions
        </Button>
        {props.reportShown !== "Attachments" && (
          <Button
            onClick={props.handleReportDownload}
            variant="contained"
            color="secondary"
            className={classes.downloadtBtn}
            startIcon={<CloudDownloadIcon />}
          >
            {props.reportShown}
          </Button>
        )}
      </div>
      <div className={classes.report}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {Object.keys(props.tables).map((report, index) => (
            <Tab key={report} label={report} {...a11yProps(index)} />
          ))}
        </Tabs>

        {Object.keys(props.tables).map((report, index) => (
          <TabPanel key={report} value={value} index={index}>
            {value === index && (
              <Table
                handleAttachmentDownload={props.handleAttachmentDownload}
                registerChange={props.registerChange}
                data={props.tables[report]}
              />
            )}
          </TabPanel>
        ))}
      </div>
    </div>
  );
}
