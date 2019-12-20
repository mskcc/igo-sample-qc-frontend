import React, { Component } from "react";

import { withLocalize } from "react-localize-redux";
import { connect } from "react-redux";
import { reportActions } from "../../actions";

import { PendingTable } from "../../components";

export class PendingContainer extends Component {
  componentDidMount() {
    if (!this.props.pending) {
      this.props.getPending();
    }
  }
  showPending = request => {
    this.props.history.push("/report/" + request);
    this.props.getRequest(request);
  };
  render() {
    return (
      <React.Fragment>
        {this.props.report.pending && (
          <PendingTable
            data={this.props.report.pending}
            showPending={this.showPending}
          />
        )}
      </React.Fragment>
    );
  }
}

PendingContainer.defaultProps = {};

const mapStateToProps = state => ({ report: state.report });

export default withLocalize(
  connect(
    mapStateToProps,
    {
      ...reportActions
    }
  )(PendingContainer)
);
