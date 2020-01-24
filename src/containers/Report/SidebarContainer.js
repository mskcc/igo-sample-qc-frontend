import React, { Component } from "react";

import { withLocalize } from "react-localize-redux";
import { Config } from "../../secret_config.js";

import { Sidebar } from "../../components";

export class SidebarContainer extends Component {
  handleSearch = requestId => {
    this.props.handleSearch(requestId.toUpperCase().trim());
  };

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
