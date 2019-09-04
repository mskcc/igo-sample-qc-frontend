import React, { Component } from "react";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";

import { connect } from "react-redux";
import { commonActions } from "../actions";
import DevTools from "./DevTools";

import { LocalizeProvider, withLocalize } from "react-localize-redux";
import enTranslations from "../translations/en.json";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Header from "../components/Header";
import CommentContainer from "./CommentContainer";
import TableContainer from "./TableContainer";

// import UploadPage from './Upload/UploadPage'
// import SubmissionsPage from './Submissions/SubmissionsPage'
// import Promote from './Promote/Promote'
import Login from "./Login";
import Logout from "./Logout";
import ErrorPage from "./ErrorPage";

import { Config } from "../secret_config.js";

function PrivateRoute({ component: Component, loggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
}

class Root extends Component {
  constructor(props) {
    super(props);

    // basic init of localization component
    this.props.initialize({
      languages: [{ name: "English", code: "en" }],
      translation: enTranslations,
      options: {
        renderToStaticMarkup,
        renderInnerHtml: false,
        defaultLanguage: "en"
      }
    });
  }

  componentDidMount() {
    //   // making sure BE and FE versions match - shows info message if not
    // this.props.checkVersion();
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  handleMsgClose = () => {
    this.props.resetMessage();
  };

  escFunction = event => {
    if (event.keyCode === 27) {
      this.props.resetMessage();
    }
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router basename={Config.BASENAME}>
          <div>
            <div className="app">
              <Header className="header" loggedIn={this.props.user.loggedIn} />
              {Config.ENV !== "production" ? <DevTools /> : <div />}
              {this.props.common.serverError ? (
                <ErrorPage />
              ) : this.props.user.loggedIn ? (
                <React.Fragment>
                  {this.props.common.loading && (
                    <CircularProgress color="secondary" size={24} />
                  )}

                  <PrivateRoute
                    loggedIn={this.props.user.loggedIn}
                    path="/logout"
                    component={Logout}
                  />
                  <Route path="/login" component={Login} />

                  <div className="content">
                    <div className="sidebar">Project Tree</div>
                    <CommentContainer />
                    <TableContainer />
                  </div>
                </React.Fragment>
              ) : (
                <Login />
              )}
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  common: state.common,
  user: state.user
});
const mapDispatchToProps = {
  ...commonActions
  ...userActions
};

export default withLocalize(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Root)
);

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      logo: "#319ae8",
      light: "#8FC7E8",
      main: "#007CBA",
      dark: "#006098"
    },
    secondary: {
      light: "#F6C65B",
      main: "#DF4602",
      dark: "#C24D00"
    },

    textSecondary: "#e0e0e0"
  }
});
