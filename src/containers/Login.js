import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { Translate } from "react-localize-redux";
import { Redirect } from "react-router-dom";

import { userActions } from "../actions";

class Login extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    this.props.login(data.get("username"), data.get("password"));
  };

  render() {
    const { submitting, pristine, classes } = this.props;
    if (!this.props.loading && this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <Translate>
        {({ translate }) => (
          <Paper elevation={1}>
            <form
              onSubmit={this.handleSubmit}
              id="login"
              className={classes.container}
            >
             
              <br />
              <br />
              <br />
              <Typography variant="h7" align="center">
             We are experiencing some backend issues and are working on a solution right now. We will try to be back up and running as soon as possible.
              </Typography>
            </form>
          </Paper>
        )}
      </Translate>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  loading: state.common.loading
});
const mapDispatchToProps = {
  ...userActions
};

const styles = theme => ({
  container: {
    padding: "2em 5em",

    display: "grid",
    justifyItems: "center",
    gridRowGap: "1em"
  }
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
