import React, { Component } from "react";
import Swal from "sweetalert2";
import { withLocalize } from "react-localize-redux";
import { connect } from "react-redux";
import { reportActions } from "../../actions";
import { allDecisionsMade } from "../../actions/helpers";

import { TableArea } from "../../components/Table";

export class TableContainer extends Component {
  componentDidMount() {
    if (this.props.report.request.samples && !this.props.report.tables) {
      this.props.getQcReports(this.props.report.request.requestId);
    }
  }
  updateReportShown = report => {
    if (this.props.report.request.samples) {
      this.props.updateReportShown(report);
    }
  };

  handleInvestigatorSubmit = () => {
    if (!allDecisionsMade(this.props.report.tables)) {
      Swal.fire({
        title: "Not all Decisions made.",
        text:
          "Please make a decision for each sample in every report before you submit to IGO.",

        type: "info",
        animation: false,
        confirmButtonColor: "#007cba",
        confirmButtonText: "Dismiss"
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text:
          "These decisions are considered final and cannot be changed on this website after you submit." +
          " If you need to change them later on, please send an email to zzPDL_CMO_IGO@mskcc.org.",

        type: "warning",
        showCancelButton: true,
        animation: false,
        confirmButtonColor: "#007cba",
        cancelButtonColor: "#df4602",
        confirmButtonText: "Submit Decisions",
        cancelButtonText: "Back to Edit"
      }).then(result => {
        if (result.value) {
          return this.props.submitInvestigatorDecision();
        } else {
          return true;
        }
      });
    }
  };

  registerChange = () => {
    this.props.registerChange();
  };
  handleAttachmentDownload = coords => {
    this.props.downloadAttachment(coords);
  };

  handleReportDownload = report => {
    this.props.downloadReport(report, this.props.report.request);
  };
  // componentDidUpdate() {
  //   console.log(this.props)

  //   // this.props.getQcReports(this.props.report.request);
  // }

  render() {
    const { report } = this.props;

    return (
      <React.Fragment>
        {this.props.report.tables && (
          <TableArea
            request={report.request}
            tables={report.tables}
            reportShown={report.reportShown}
            updateReportShown={this.updateReportShown}
            handleSubmit={this.handleInvestigatorSubmit}
            registerChange={this.registerChange}
            handleAttachmentDownload={this.handleAttachmentDownload}
            handleReportDownload={this.handleReportDownload}
          />
        )}
      </React.Fragment>
    );
  }
}

TableContainer.defaultProps = {};

const mapStateToProps = state => ({ report: state.report });

export default withLocalize(
  connect(
    mapStateToProps,
    {
      ...reportActions
    }
  )(TableContainer)
);
