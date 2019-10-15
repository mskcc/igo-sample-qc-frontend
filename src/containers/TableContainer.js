import React, { Component } from "react";

import { withLocalize } from "react-localize-redux";
import { connect } from "react-redux";
import { reportActions } from "../actions";

import { TableArea } from "../components/Table";

export class TableContainer extends Component {
  // handleFormSubmit = formValues => {
  //   this.props.getColumns(formValues);
  // };
  // handleGridSubmit = formValues => {
  //   this.props.addGridToBankedSample(this.props);
  // };

  // addComment = comment => {
  //   this.props.addComment({
  //     author: "username",
  //     date: new Date().getTime()/1000,
  //     content: comment
  //   });
  // };
  componentDidMount() {
    if (this.props.report.request.samples) {
      this.props.getQcReports(this.props.report.request.requestId);
    }
  }
  updateReportShown = report => {
    if (this.props.report.request.samples) {
      this.props.updateReportShown(report);
    }
  };

  handleSubmit = () => {
    this.props.submitInvestigatorDecision();
  };
  registerChange = () => {
    this.props.registerChange();
  };
  handleAttachmentDownload = coords => {
    this.props.downloadAttachment(coords);
  };

  handleReportDownload = (report) => {
    this.props.downloadReport(
      report,
      this.props.report.request
    );
  };
  // componentDidUpdate() {
  //   console.log(this.props)

  //   // this.props.getQcReports(this.props.report.request);
  // }

  render() {
    const { report } = this.props;
    console.log(report.reportShown);
    return (
      <React.Fragment>
        {this.props.report.tables && (
          <TableArea
            request={report.request}
            tables={report.tables}
            reportShown={report.reportShown}
            updateReportShown={this.updateReportShown}
            handleSubmit={this.handleSubmit}
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
