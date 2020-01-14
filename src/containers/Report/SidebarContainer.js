import React, { Component } from "react";

import { withLocalize } from "react-localize-redux";
import { connect } from "react-redux";
import { reportActions } from "../../actions";
import { Config } from "../../secret_config.js";

import { Sidebar } from "../../components";

export class SidebarContainer extends Component {
  handleSearch = requestId => {
    console.log(this.props);
    this.props.handleSearch(requestId.toUpperCase());
  };
  // handleGridSubmit = formValues => {
  //   this.props.addGridToBankedSample(this.props);
  // };

  render() {
    return (
      <React.Fragment>
        <Sidebar
          pattern={Config.REQUEST_PATTERN}
          handleSubmit={this.handleSearch}
        />
      </React.Fragment>
    );
  }
}

SidebarContainer.defaultProps = {};

export default withLocalize(SidebarContainer);
