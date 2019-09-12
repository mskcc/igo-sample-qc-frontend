import React, { Component } from "react";
import PropTypes from "prop-types";

import { withLocalize } from "react-localize-redux";
import { connect } from "react-redux";
// import { commentActions } from "../actions";
import { Redirect } from "react-router-dom";

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

  render() {
    return (
      <React.Fragment>
        <TableArea request={this.props.request}/>
      </React.Fragment>
    );
  }
}

TableContainer.defaultProps = {};

const mapStateToProps = state => ({});

export default withLocalize(
  connect(
    mapStateToProps,
    {
      // ...uploadGridActions,
    }
  )(TableContainer)
);
