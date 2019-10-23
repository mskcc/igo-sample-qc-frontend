import React, { Component } from "react";

import { withLocalize } from "react-localize-redux";
import { connect } from "react-redux";
import { commonActions, userActions } from "../../actions";

import CommentContainer from "./CommentContainer";
import TableContainer from "./TableContainer";
import SidebarContainer from "./SidebarContainer";

export class ReportContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="content">
          <SidebarContainer />
          {this.props.report.loaded && (
            <React.Fragment>
              <CommentContainer />
              <TableContainer />
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

ReportContainer.defaultProps = {};

const mapStateToProps = state => ({
  common: state.common,
  user: state.user,
  report: state.report
});
const mapDispatchToProps = {
  ...commonActions,
  ...userActions
};
export default withLocalize(
  connect(
    mapStateToProps,
    {
      mapDispatchToProps
    }
  )(ReportContainer)
);
