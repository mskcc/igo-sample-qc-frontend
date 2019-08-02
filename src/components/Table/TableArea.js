import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "./Table";
import "handsontable/dist/handsontable.full.css";

import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  container: {
    textAlign: "left",
    marginRight: theme.spacing(3),
    gridArea: "table",

    // gridArea: "comments",
    // width: "85vw",
    overflow: "scroll",
    paddingBottom: theme.spacing(2),
    display: "grid"
    // gridTemplateAreas: "'table CommentTextField'",
    // gridTemplateColumns: "70% 30%"
  }
});

const TableArea = ({ comments, addComment, classes }) => (
  <div className={classes.container}>
    <Typography variant="h5">QC Results for X</Typography>
    <Table />
  </div>
);

TableArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TableArea);
