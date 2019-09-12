import React, { Component } from "react";
import PropTypes from "prop-types";

import { withLocalize } from "react-localize-redux";
import { connect } from "react-redux";
import { reportActions } from "../actions";
import { Redirect } from "react-router-dom";
import { Config } from "../secret_config.js";

import { Sidebar } from "../components";

export class SidebarContainer extends Component {
  handleSubmit = requestId => {
    console.log(requestId)
    this.props.getRequest(requestId);
  };
  // handleGridSubmit = formValues => {
  //   this.props.addGridToBankedSample(this.props);
  // };


  render() {
    return (
      <React.Fragment>
        <Sidebar pattern={Config.REQUEST_PATTERN} handleSubmit={this.handleSubmit}/>
      </React.Fragment>
    );
  }
}

SidebarContainer.defaultProps = {};

const mapStateToProps = state => ({});

export default withLocalize(
  connect(
    mapStateToProps,
    {
      ...reportActions,
    }
  )(SidebarContainer)
);
