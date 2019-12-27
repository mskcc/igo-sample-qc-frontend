import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    width: "80vw",
    height: "80vh",
    margin: "5% auto"
  },
  iframe: {
    width: "100%",
    height: "100%"
  }
});

const Instructions = ({ role, classes }) => (
  <div className={classes.container}>
    {role === "lab_member" ? (
      <iframe
        title="IGO-Member-CheatSheet"
        className={classes.iframe}
        allowFullScreen
        frameBorder="0"
        src="https://www.lucidchart.com/documents/embeddedchart/f1fcc586-50bc-4239-8ca8-96cd54833ffa"
        id="MERilBZKM5U~"
      />
    ) : (
      <iframe
        title="Investigator-Member-CheatSheet"
        className={classes.iframe}
        allowFullScreen
        frameBorder="0"
        src="https://www.lucidchart.com/documents/embeddedchart/9f9aca27-2f94-453f-89a3-4b90c2a5e68b"
        id=".q6i6VmMzlMS"
      />
    )}
  </div>
);

Instructions.propTypes = {
  classes: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired
};

export default withStyles(styles)(Instructions);
