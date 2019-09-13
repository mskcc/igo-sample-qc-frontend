import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Table from "./Table";
import "handsontable/dist/handsontable.full.css";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "left",
    marginRight: theme.spacing(3),
    gridArea: "table",

    // gridArea: "comments",
    // width: "85vw",
    overflow: "scroll",
    paddingBottom: theme.spacing(2)
    // display: "grid"
    // gridTemplateAreas: "'table CommentTextField'",
    // gridTemplateColumns: "70% 30%"
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
      <Box p={3}>{children}</Box>
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
      <Typography variant="h5">QC Results for {props.request}</Typography>
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="DNA Report" {...a11yProps(0)} />
          <Tab label="RNA Report" {...a11yProps(1)} />
          <Tab label="Library" {...a11yProps(2)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          {value === 0 && <Table />}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {value === 1 && <Table />}
          <Table />
        </TabPanel>
        <TabPanel value={value} index={2}>
          {value === 2 && <Table />}
        </TabPanel>
      </div>
    </div>
  );
}
