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
