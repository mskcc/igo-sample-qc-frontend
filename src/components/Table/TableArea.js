import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Table from "./Table";
import RequestInfo from "./RequestInfo";
import "handsontable/dist/handsontable.full.css";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "2em",
    marginTop: "2em",
    textAlign: "left",
    marginRight: theme.spacing(3),
    gridArea: "table",
    display: "grid",
    gridTemplateAreas: "'request' 'reports'",
    // gridArea: "comments",
    // width: "85vw",
    overflow: "scroll",
    paddingBottom: theme.spacing(2)
    // display: "grid"
    // gridTemplateAreas: "'table CommentTextField'",
    // gridTemplateColumns: "70% 30%"
  },

  table: {
    gridArea: "table"
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
  }
  return (
    <div className={classes.container}>
      <RequestInfo request={props.request} />

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
            {value === index && <Table data={props.tables[report]} />}
          </TabPanel>
        ))}
      </div>
    </div>
  );
}
